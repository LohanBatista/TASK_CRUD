// /users/:id
export function buildRoutePath(path) {
  const routeParamentersRegex = /:([a-zA-Z]+)/g; // Match any alphanumeric character
  const pathWithParams = path.replaceAll(
    routeParamentersRegex,
    "(?<$1>[a-zA-Z0-9--_]+)" // Match any alphanumeric character, hyphen, or underscore
  );

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
  return pathRegex;
}
