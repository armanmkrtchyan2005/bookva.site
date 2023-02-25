import React from "react";
import { Link } from "react-router-dom";
import "./adver.css";

const Adver = () => {
  return (
    <div className="adv">
      <div className="main">
        <div className="img">{/* <img alt="not found" /> */}</div>
        <div className="text">
          <h2>Название компании</h2>
          <p>
            Дата старта <span>15 августа 2022</span>
          </p>
          <p>
            Клики <span>12</span>
          </p>
          <Link>www.company.com</Link>
        </div>
      </div>
      <div>
        <div className="values">
          <p className="firstNum">350</p>
          <p className="secondNum">1000</p>
        </div>
        <div className="line">
          <div
            className="completed"
            style={{ width: (350 * 100) / 1000 + "%" }}
          ></div>
        </div>
      </div>
      <div className="btns">
        <button className="firstBtn">Опубликовано</button>
        <button className="secondBtn">Редактировать</button>
      </div>
    </div>
  );
};

export default Adver;
