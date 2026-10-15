const list = document.querySelector("#repository-list");
const status = document.querySelector("#list-status");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }
    return response.json();
  })
  .then((repositories) => {
    repositories.forEach((repository) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const date = document.createElement("time");

      link.href = repository.url;
      link.textContent = repository.repository;
      description.textContent = repository.description;
      date.dateTime = repository.starred_at;
      date.textContent = `Starred on ${repository.starred_at}`;

      item.append(link, description, date);
      list.append(item);
    });

    status.textContent = `${repositories.length} starred repositories`;
  })
  .catch((error) => {
    status.textContent = `Unable to load starred repositories: ${error.message}`;
  });
