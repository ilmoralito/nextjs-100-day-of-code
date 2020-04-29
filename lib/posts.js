import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const files = getFileNames();
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

function getFileNames() {
  return fs.readdirSync(postsDirectory);
}

export function getAllPostIds() {
  const fileNames = getFileNames();

  return fileNames.map((filename) => ({
    params: {
      id: filename.replace(/\.md$/, ""),
    },
  }));
}

export function getOtherPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = grayMatter(fileContents);

  return {
    id,
    ...matterResult.data,
  };
}
