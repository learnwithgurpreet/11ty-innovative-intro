const dotenv = require("dotenv");

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = 'learnwithgurpreet'; // replace with the user/org name
const REPO_COUNT = 6;

module.exports = async function () {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': '11ty-data-fetcher',
  };

  const url = `https://api.github.com/search/repositories?q=user:${USERNAME}&sort=stars&order=desc&per_page=${REPO_COUNT}`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    console.error(`GitHub API error: ${response.statusText}`);
    return [];
  }

  const data = await response.json();
  return data.items.map(repo => ({
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
    language: repo.language,
    updated_at: repo.updated_at,
  }));
}
