import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";
import UnapprovePict from "../images/cross.png"
import { createPortal } from "react-dom";

function Login({ name, button, setloggedIn }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [infoTooltip, setInfoTooltip] = useState({
    visible: "popup popup_opened InfoTooltip",
    images: UnapprovePict,
    status: "Что-то пошло не так! Попробуйте еще раз.",
    isOpen: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleClose = useCallback(() => {
    setInfoTooltip((s) => ({...s, isOpen: false}));
    navigate("/sign-in", { replace: true });
  }, [navigate])

  function openTooltip() {
    setInfoTooltip((s) => ({...s, isOpen: true}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .signIn(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setloggedIn(true);
          setFormValue({ email: "", password: "" });
          navigate("/", { replace: true });
          localStorage.setItem("token", data.token);
        } else {
          openTooltip()
        }
      })
      .catch(() => openTooltip());
  };

  function navRegister() {
    navigate("/sign-up", { replace: true });
  }

  return (
    <>
      <Header
        onClick={navRegister}
        nameClick="Регистрация"
        setUserEmail=""
      ></Header>
      <div className="authorization">
        <p className="authorization__name">{name}</p>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <section className="authorization__section">
            <input
              name="email"
              type="email"
              className="authorization__input"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
            ></input>
            <input
              name="password"
              type="password"
              className="authorization__input"
              placeholder="Пароль"
              value={formValue.password}
              onChange={handleChange}
            ></input>
          </section>
          <button className="authorization__submit">{button}</button>
        </form>

        {infoTooltip.isOpen && createPortal(
          <InfoTooltip
            status={infoTooltip.status}
            visible={infoTooltip.visible}
            images={infoTooltip.images}
            onClose={handleClose}
          ></InfoTooltip>,
          document.body
        )}
      </div>
    </>
  );
}

export default Login;
