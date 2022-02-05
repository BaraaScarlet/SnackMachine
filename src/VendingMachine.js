import React, { Component } from "react";

class VendingMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paidMoney: 0,
      currentSnack: {},
      displayMsg: "Please choose a snack to buy!",
      snacks: [
        { Name: "A1", Price: 5, Amount: 1, imageSrc: "images/snack1.png" },
        { Name: "A2", Price: 2, Amount: 5, imageSrc: "images/snack2.png" },
        { Name: "A3", Price: 3, Amount: 5, imageSrc: "images/snack3.png" },
        { Name: "A4", Price: 2, Amount: 2, imageSrc: "images/snack4.png" },
        { Name: "A5", Price: 10, Amount: 5, imageSrc: "images/snack5.png" },
        { Name: "B1", Price: 20, Amount: 5, imageSrc: "images/snack6.png" },
        { Name: "B2", Price: 15, Amount: 5, imageSrc: "images/snack7.png" },
        { Name: "B3", Price: 13.5, Amount: 5, imageSrc: "images/snack8.png" },
        { Name: "B4", Price: 11, Amount: 5, imageSrc: "images/snack9.png" },
        { Name: "B5", Price: 3.2, Amount: 3, imageSrc: "images/snack10.png" },
        { Name: "C1", Price: 1, Amount: 5, imageSrc: "images/snack11.png" },
        { Name: "C2", Price: 3, Amount: 5, imageSrc: "images/snack12.png" },
        { Name: "C3", Price: 6, Amount: 4, imageSrc: "images/snack13.png" },
        { Name: "C4", Price: 10, Amount: 5, imageSrc: "images/snack14.png" },
        { Name: "C5", Price: 2, Amount: 5, imageSrc: "images/snack15.png" },
        { Name: "D1", Price: 16, Amount: 5, imageSrc: "images/snack16.png" },
        { Name: "D2", Price: 6, Amount: 5, imageSrc: "images/snack17.png" },
        { Name: "D3", Price: 6.5, Amount: 5, imageSrc: "images/snack18.png" },
        { Name: "D4", Price: 4, Amount: 5, imageSrc: "images/snack19.png" },
        { Name: "D5", Price: 8, Amount: 5, imageSrc: "images/snack20.png" },
        { Name: "E1", Price: 5.6, Amount: 5, imageSrc: "images/snack21.png" },
        { Name: "E2", Price: 6.9, Amount: 5, imageSrc: "images/snack22.png" },
        { Name: "E3", Price: 4.2, Amount: 5, imageSrc: "images/snack23.png" },
        { Name: "E4", Price: 1, Amount: 5, imageSrc: "images/snack24.png" },
        { Name: "E5", Price: 0.5, Amount: 5, imageSrc: "images/snack5.png" },
      ],
    };
  }

  /*
      1- Start function(input listener)
      2- snackAvailability
      3- MoneyLisntener
      4- moneyCheck
      5- Dispense
      6- changeCalculater
       */
  getHeight = (index) => {
    if (index <= 4) {
      return "63px";
    } else if (index <= 9) {
      return "76px";
    } else if (index <= 14) {
      return "76px";
    } else if (index <= 19) {
      return "76px";
    } else if (index <= 24) {
      return "61px";
    }
  };
  enterMoney = () => {
    if (this.state.currentSnack?.Name) {
      //check money type(0.1$,0.2$,0.5$,1$,20$,50$), if false change display message then call clickKeypadButton after a delay, if true cont.
      const acceptedMoney = [0.1, 0.2, 0.5, 1, 20, 50];

      let paid = parseFloat(this.state.money);
      let moneyChecked = acceptedMoney.some((am) => am === paid);
      if (!moneyChecked) {
        let amounts = acceptedMoney.join("$, ");
        let self = this;
        this.setState({
          displayMsg: "Please enter a valid amount(" + amounts + ")",
        });
        setTimeout(function () {
          self.clickKeypadButton(self.state.currentSnack, true);
        }, 5000);
      } else {
        var newMoney = parseFloat(this.state.money);
        var oldMoney = this.state.paidMoney;
        this.setState({ paidMoney: oldMoney + newMoney, money: 0 }, () => {
          this.clickKeypadButton(this.state.currentSnack, true);
          if (this.state.paidMoney >= this.state.currentSnack.Price) {
            let change = this.state.paidMoney - this.state.currentSnack.Price;
            let { snacks } = this.state;
            snacks.forEach((e) => {
              if (e.Name === this.state.currentSnack.Name) {
                e.Amount = e.Amount - 1;
              }
            });
            this.setState({
              displayMsg: "Have a nice day!\n\nYour Change is " + change + "$",
              paidMoney: 0,
              snacks: snacks,
            });

            let self = this;
            setTimeout(function () {
              self.setState({ displayMsg: "Please choose a snack to buy!" });
            }, 7000);
          }
          //check if paidMoney>=snack price, if false do nothing, if true, display good nigger then check for change
          //check for change, if paidMoney>snack price, we display paidMoney-snack price as the change, then we reset
          //this.setState({ paidMoney: 0, displayMsg:"Please choose a snack to buy!" });
          //reduce amount in snacks array
        });
      }
    } else {
      this.setState({
        displayMsg: "Please enter a snack you would like to buy first!",
      });
    }
  };
  clickKeypadButton = (snack, noCheck) => {
    if (!noCheck && this.state.paidMoney > 0) {
      snack = this.state.currentSnack;
      setTimeout(function () {
        this.setState({
          displayMsg:
            "You can't change the requested snack once you enter money, please use the back button on the bottom left corner if you still wish to do so!",
        });
      }, 7000);
    }
    if (snack.Amount > 0) {
      this.setState({
        currentSnack: snack,
        displayMsg:
          "Snack " +
          snack.Name +
          " is available and it's price is " +
          snack.Price +
          "\n\npaid money: " +
          this.state.paidMoney,
      });
    } else
      this.setState({ displayMsg: "This snack is not available! Please choose another one." });
  };
  render() {
    const numbers = [1, 2, 3, 4, 5];
    const letters = ["A", "B", "C", "D", "E"];
    return (
      <div className="mainContainer">
        <div className="snacksSlots">
          <div className="left">
            <div style={{ height: "27px" }}></div>
            <div className="Letters">
              {letters.map((l, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      height: this.getHeight(5 * index),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {l}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="middle">
            <div className="Numbers">
              {numbers.map((n, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "41px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {n}
                  </div>
                );
              })}
            </div>
            <div className="snacks">
              {this.state.snacks.map((e, index) => {
                return (
                  <div
                    key={index}
                    className="snackItem"
                    style={{ height: this.getHeight(index) }}
                  >
                    <img
                      className="snackImage"
                      src={e.imageSrc}
                      alt="img placeholder"
                    ></img>
                    {e.Price}$
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right"></div>
        </div>
        <div className="spacer"></div>
        <div className="ioContainer">
          <pre className="display">{this.state.displayMsg}</pre>

          <div className="moneySlots">
            <div className="container">
              <i className="fas fa-coins"></i>
              <div className="coinSlot"></div>
            </div>

            <div className="container">
              <i className="fab fa-cc-visa"></i>
              <div className="cardSlot"></div>
            </div>

            <div className="container">
              <i className="fas fa-money-bill-wave"></i>
              <div className="moneySlot"></div>
            </div>
          </div>

          <div className="keypad">
            {this.state.snacks.map((s, index) => {
              return (
                <button
                  className="keypadButton"
                  key={index}
                  onClick={() => this.clickKeypadButton(s)}
                >
                  {s.Name}
                </button>
              );
            })}
          </div>
          <div className="back">
            <button className="backKey">
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
        </div>
        <div className="MoneyInput">
          <input
            placeholder="Enter your money"
            value={this.state.money}
            onChange={(e) => this.setState({ money: e.target.value })}
          ></input>
          <button onClick={this.enterMoney}>
            <i className="fas fa-money-check-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default VendingMachine;
