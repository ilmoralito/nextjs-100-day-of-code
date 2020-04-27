import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const files = fs.readdirSync(postsDirectory);
  const posts = files.map((file) => {
    const id = getPostId(file);
    const data = getPostData(file);

    return {
      id,
      ...data,
    };
  });

  return posts.sort((a, b) => a.date < b.date);
}

function getPostId(file) {
  return file.replace(/\.md$/, "");
}

function getPostData(file) {
  const fullPath = path.join(postsDirectory, file);
  const content = fs.readFileSync(fullPath, "utf-8");
  const result = grayMatter(content);

  return result.data;
}
