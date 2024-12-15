
fetch('./menu.json')
  .then(response => response.json())
  .then(MenuData => {
    const TESt = document.querySelector('.testImg');
    console.log(TESt);

    // Access the `imgUrl` of the first item in LogosMenu
    const imgUrl = MenuData.LogosMenu[0].imgUrl;

    // Append the image dynamically
    TESt.innerHTML += `
      <p>This is my imgUrl: ${imgUrl}</p>
      <img src="${imgUrl}" alt="Menu Image">
    `;
  })
  .catch(error => {
    console.error("Error fetching or parsing menu.json:", error);
  });
