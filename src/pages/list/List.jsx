import React, { Component } from "react";
import CatalogItem from "../../components/searchItem/Catallogitem"; // Corrected import path
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "", // State to hold the search query
      items: [
        [
          "Tranquil Heights Resort",
          "200",
          "En-suite bathroom with bathtub, king-sized bed, walk-in wardrobe, balcony with city view",
          202,
          2,
          0,
        ],
        [
          "Emerald Oasis Inn",
          "300",
          "Twin beds, private bathroom with shower, mini-fridge, workstation, mountain view",
          198,
          1,
          0,
        ],
        [
          "Starlight Retreat",
          "400",
          "Queen-sized bed, spacious seating area, marble bathroom with jacuzzi, ergonomic work desk",
          202,
          2,
          2,
        ],
        [
          "Serenity Springs Hotel",
          "300",
          "Two connecting bedrooms, one king and two twin beds, two bathrooms, kitchenette, dining area, pool view",
          204,
          2,
          1,
        ],
        [
          "Golden Sands Lodge",
          "500",
          "Master bedroom with California king bed, living room with fireplace, gourmet kitchen, private terrace with hot tub, ocean view",
          8002,
          1,
          1,
        ],
      ],
      options: {
        minPrice: 0,
        maxPrice: 1000,
        adult: 1,
        children: 0,
        rooms: 1,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({ searchString: event.target.value });
  }

  handleOptionChange(event, optionName) {
    const { value } = event.target;
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        [optionName]: value,
      },
    }));
  }

  handleSearch() {
    // Implement search functionality if needed
    // For now, it just resets the search string
    this.setState({ searchString: "" });
  }

  render() {
    const { minPrice, maxPrice, adult, children, rooms } = this.state.options;

    // Filter items based on searchString
    const filteredItems = this.state.items.filter((item) =>
      item[0].toLowerCase().includes(this.state.searchString.toLowerCase())
    );

    console.log("Filtered Items:", filteredItems);

    return (
      <div className="container py-3">
        <div>
          <Navbar />
          <Header type="list" />
          <div className="listContainer">
            <div className="listWrapper">
              <div className="listSearch">
                <h1 className="lsTitle">Search</h1>
                <div className="lsItem">
                  {/* Search input field */}
                  <input
                    type="text"
                    placeholder="Enter destination..."
                    value={this.state.searchString}
                    onChange={this.handleChange}
                    className="form-control mb-4"
                  />

                  <div className="lsItem">
                    <label>Options</label>
                    <div className="lsOptions">
                      <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Min price <small>per night</small>
                        </span>
                        <input
                          type="number"
                          className="lsOptionInput"
                          value={minPrice}
                          onChange={(e) =>
                            this.handleOptionChange(e, "minPrice")
                          }
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Max price <small>per night</small>
                        </span>
                        <input
                          type="number"
                          className="lsOptionInput"
                          value={maxPrice}
                          onChange={(e) =>
                            this.handleOptionChange(e, "maxPrice")
                          }
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Adult</span>
                        <input
                          type="number"
                          min={1}
                          className="lsOptionInput"
                          value={adult}
                          onChange={(e) => this.handleOptionChange(e, "adult")}
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Children</span>
                        <input
                          type="number"
                          min={0}
                          className="lsOptionInput"
                          value={children}
                          onChange={(e) =>
                            this.handleOptionChange(e, "children")
                          }
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Room</span>
                        <input
                          type="number"
                          min={1}
                          className="lsOptionInput"
                          value={rooms}
                          onChange={(e) => this.handleOptionChange(e, "rooms")}
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={this.handleSearch}>Search</button>
                </div>
              </div>
              <div className="listResult">
                <div>
                  <h2>Hotels</h2>
                </div>
                <div className="row">
                  {filteredItems.map((item, index) => (
                    <div
                      key={`${item[0]}-${index}`}
                      className="col-sm-6 col-lg-4 mb-4"
                    >
                      <CatalogItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
