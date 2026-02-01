import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "bootstrap/dist/css/bootstrap.min.css";
import { createMemoryHistory } from "history";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../resources/context/AuthContext"; // globaali muuttuja autentikointiin
import { BooleanProvider } from "../resources/context/BooleanContext";
import "../stylesheets/Matkakertomus.css";
import Matkakertomus from "../Matkakertomus"; // entry point sovellukseen


describe("Testi Napeille", () => {
  test("Rekisteröinti nappi", async () => {
    const history = createMemoryHistory();

    render(
      <AuthProvider>
        <BooleanProvider>
          <MemoryRouter location={history.location} navigator={history}>
            <Matkakertomus />
          </MemoryRouter>
        </BooleanProvider>
      </AuthProvider>
    );

    //screen.debug();
    //await screen.findByText(/Matkakertomus/i)
    const rekisteroidy = screen.getByTestId("rekisteröidy");
    expect(rekisteroidy).toBeInTheDocument();
    /*
    const rekist = screen.getByText(/Rekisteröidy/i);
    expect(rekist).toBeInTheDocument()
    fireEvent.click(rekist)
*/
    //expect(screen.getByText(/Luo uusi tunnus/i).toBeInTheDocument()
  });
  test("Kirjaudu nappi", async () => {
    const history = createMemoryHistory();

    render(
      <AuthProvider>
        <BooleanProvider>
          <MemoryRouter location={history.location} navigator={history}>
            <Matkakertomus />
          </MemoryRouter>
        </BooleanProvider>
      </AuthProvider>
    );

    const kirjaudu = screen.getByTestId("kirjaudu");
    expect(kirjaudu).toBeInTheDocument();
  });
});

describe("Testi Rekisteröitymiselle", () => {
  test("Rekisteröidtyminen nappi vie sivulle", async () => {
    const history = createMemoryHistory();

    render(
      <AuthProvider>
        <BooleanProvider>
          <MemoryRouter location={history.location} navigator={history}>
            <Matkakertomus />
          </MemoryRouter>
        </BooleanProvider>
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId("rekisteröidy"));

    expect(screen.getByText(/Luo uusi tunnus/i)).toBeInTheDocument();
  });
  test("Rekisteröidtyminen kentät toimii ja voi rekisteröityä", async () => {
    const history = createMemoryHistory();

    render(
      <AuthProvider>
        <BooleanProvider>
          <MemoryRouter location={history.location} navigator={history}>
            <Matkakertomus />
          </MemoryRouter>
        </BooleanProvider>
      </AuthProvider>
    );

    fireEvent.click(screen.getByTestId("rekisteröidy"));

    expect(screen.getByText(/Luo uusi tunnus/i)).toBeInTheDocument();

    let nimimerkki = screen.getByLabelText(/Nimimerkki/i);
    let salasana = screen.getByTestId("salasanarekisteröidy");
    let salasana2 = screen.getByLabelText(/Salasana uudelleen/i);
    let etunimi = screen.getByLabelText(/Etunimi/i);
    let sukunimi = screen.getByLabelText(/Sukunimi/i);
    let säpö = screen.getByLabelText(/Sähköpostiosoite/i);

    userEvent.type(nimimerkki, "TestiOhjelma");
    userEvent.type(salasana, "Testaaja1");
    userEvent.type(salasana2, "Testaaja1");
    userEvent.type(etunimi, "Matkakertomus");
    userEvent.type(sukunimi, "Testaaja");
    userEvent.type(säpö, "Testi@Testaaja");

    userEvent.click(screen.getByTestId("rekButton"));

    expect(nimimerkki).toHaveValue("TestiOhjelma");
    expect(sukunimi).toHaveValue("Testaaja");

    //expect(screen.getByTestId("success2")).toBeInTheDocument();
  });
});

describe("Testi Kirjautumiselle", () => {
  test("kirjautumis nappi vie sivulle", async () => {
    const history = createMemoryHistory();

    render(
      <AuthProvider>
        <BooleanProvider>
          <MemoryRouter location={history.location} navigator={history}>
            <Matkakertomus />
          </MemoryRouter>
        </BooleanProvider>
      </AuthProvider>
    );

    const kirjaudu = screen.getByTestId("kirjaudu");
    expect(kirjaudu).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("kirjaudu"));

    expect(screen.getByText(/Unohtuiko salasana?/i)).toBeInTheDocument();
  });
  test("Kirjautumis kentät toimii ja voi kirjautua", async () => {
    const history = createMemoryHistory();

    render(
      <AuthProvider>
        <BooleanProvider>
          <MemoryRouter location={history.location} navigator={history}>
            <Matkakertomus />
          </MemoryRouter>
        </BooleanProvider>
      </AuthProvider>
    );
    const kirjaudu = screen.getByTestId("kirjaudu");
    expect(kirjaudu).toBeInTheDocument();

    fireEvent.click(kirjaudu);

    let säpö = screen.getByTestId("emaillog");
    let salasana = screen.getByTestId("salasanalogin");

    userEvent.type(säpö, "Testi@Testaaja");
    
    expect(säpö).toHaveValue("Testi@Testaaja");
    userEvent.type(salasana, "Testaaja1");

    fireEvent.click(screen.getByTestId("kirjaudunappula"));

    expect(salasana).toHaveValue("Testaaja1");

    //expect(screen.getByTestId("success")).toBeInTheDocument();
  });
});
