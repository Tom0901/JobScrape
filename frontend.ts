//grab DOM elements needed//
let display = document.querySelector(".display");
let submit = document.querySelector(".btn");

interface UIInt {
  clearUI(): void;
  createLoadingUI(): void;
  fetchData(): void;
  postData(): void;
  renderData(data: object): void;
}

class UI implements UIInt {
  clearUI() {
    (display as HTMLElement).innerHTML = "";
  }

  createLoadingUI() {
    (display as HTMLElement).innerHTML = `
   <div class="row center-align margin-vertical">
        <div class="col s12 m6 offset-m3">
          <div class="card center-align">
            <div class="card-content">
              <i class="large material-icons indigo-text">local_shipping</i>
              <span class="card-title text-bold">
               Your Dream Job is on it's Way
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="progress margin-bottom">
      <div class="indeterminate"></div>
  </div>`;
  }

  async fetchData() {
    const response = await fetch("http://localhost:5501/creators");
    const data = await response.json();
    console.log(data);

    this.renderData(data);
  }

  async postData() {
    const locationInput = (document.querySelector(
      "#location"
    ) as HTMLInputElement).value;
    const techInput = (document.querySelector("#tech") as HTMLInputElement)
      .value;
    const customURL = `https://www.google.com/search?ei=HSq0Xt7IDoz5gQbGip6ABg&q=${techInput}+${locationInput}&oq=${techInput}+${locationInput}+jobs+&gs_lcp=CgZwc3ktYWIQAzIFCCEQoAEyBQghEKABMgUIIRCgATIFCCEQoAE6BggAEAgQHjoGCAAQFhAeUOYSWNIXYIIZaABwAHgAgAGrAYgB7QaSAQM1LjOYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&uact=5&ibp=htl;jobs&sa=X&ved=2ahUKEwiH6N6-iaLpAhX9QUEAHTWjBGMQiYsCKAF6BAgKEBE#fpstate=tldetail&htivrt=jobs&htidocid=odTsQfLDpmatfzNQAAAAAA%3D%3D`;
    console.log(locationInput, techInput, customURL);
    const dataToSend = { customURL };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };
    const response = await fetch(
      "http://localhost:5500/something",
      fetchOptions
    );

    const data = await response.json();

    this.renderData(data);
  }

  renderData(data: object) {
    console.log(data);
    this.clearUI();

    //get arrays of  the data returned
    let titleArray = data.jobData.titles;
    let hrefArray = data.jobData.hrefs;

    console.log(hrefArray);

    //iterate over array

    titleArray.forEach((title) => {
      const card = document.createElement("div");
      card.classList.add("row");
      card.innerHTML = `
        <a href= "#>
            <div class="col s12 m6 offset-m3">
                <div class="card">
                    <div class="card-content">
                        <i class="large material-icons red-text">timeline</i>
                        <span class="card-title text-bold"><span></span>${title}</span>
                    </div>
                </div>
            </div>
        </a>`;
      display.appendChild(card);
    });
  }
}

//instances and events//

const ui = new UI();

submit.addEventListener("click", (e) => {
  e.preventDefault();
  ui.clearUI();
  ui.createLoadingUI();
  ui.postData();
});

console.log(submit);
