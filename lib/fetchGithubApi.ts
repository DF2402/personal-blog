interface LanguageStats {
  [language: string]: number;
}
async function getRepoLanguages(
  owner: string,
  repo: string,
  token: string,
): Promise<LanguageStats> {
  const url = `https://api.github.com/repos/${owner}/${repo}/languages`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2026-03-10",
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`fail: ${response.statusText}`);
  }

  return (await response.json()) as LanguageStats;
}

interface Repository {
  name: string;
}

async function getRepo(owner: string, token: string): Promise<Repository[]> {
  const url = `https://api.github.com/users/${owner}/repos?per_page=100`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2026-03-10",
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`fail: ${response.statusText}`);
  }

  const rawData = await response.json();

  return rawData.map((repo: any) => ({
    name: repo.name,
  })) as Repository[];
}
export default async function getGithubData() {
  if (!process.env.GITHUB_TOKEN) {
    console.log("NO GITHUB TOKEN");
    return;
  }
  const token = process.env.GITHUB_TOKEN;
  try {
    let repos = await getRepo("DF2402", token);
    const languagePromises = repos.map(async (repo) => {
      const result = await getRepoLanguages("DF2402", repo.name, token);
      return { name: repo.name, result };
    });

    const allResults = await Promise.all(languagePromises);

    const totalStats = allResults.reduce(
      (acc, entry) => {
        for (const [lang, bytes] of Object.entries(entry.result)) {
          acc[lang] = (acc[lang] || 0) + bytes;
        }
        return acc;
      },
      {} as { [key: string]: number },
    );

    return totalStats;
  } catch (error) {
    console.error("fail:", error);
  }
}
