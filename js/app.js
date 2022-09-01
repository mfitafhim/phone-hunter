const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}
loadPhones('iphone');

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    phones = phones.slice(0, 10);
    // show no phone msg
    if (phones.length === 0) {
        alert('No Phone Found');
    }
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
              <img src="${phone.image}" class="card-img-top p-4" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <a onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#phoneDetailsModal">Details</a>
              </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    toggleLoader(false);
}

// searching phone
const searchingPhone = () => {
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    searchField.value = '';
}
document.getElementById('search-field').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        toggleLoader(true);
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;
        loadPhones(searchText);
        searchField.value = '';
    }
});
//loader
const toggleLoader = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none')
    } else {
        loader.classList.add('d-none')
    }
}

//loadPhoneDetails
const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const title = document.getElementById('phoneDetailsModalLabel');
    title.innerText = phone.name;
}