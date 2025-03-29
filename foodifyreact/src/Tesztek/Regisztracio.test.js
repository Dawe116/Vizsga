import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Regisztracio } from "../Komponensek/Regisztracio";

jest.mock("axios");

describe("Regisztracio component", () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: [{ id: 1, name: "Borsod" }] });
    });

    test("Renders first step and allows user input", () => {
        render(
            <BrowserRouter>
                <Regisztracio />
            </BrowserRouter>
        );

        expect(screen.getByText("Regisztráció")).toBeInTheDocument();
        
        const nameInput = screen.getByPlaceholderText("Teljes név");
        fireEvent.change(nameInput, { target: { value: "Teszt Felhasználó" } });
        expect(nameInput.value).toBe("Teszt Felhasználó");
    });

    test("Navigates to step 2 on valid input", async () => {
        render(
            <BrowserRouter>
                <Regisztracio />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Teljes név"), { target: { value: "Teszt Felhasználó" } });
        fireEvent.change(screen.getByPlaceholderText("Felhasználónév"), { target: { value: "tesztuser" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "teszt@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Jelszó"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Jelszó megerősítése"), { target: { value: "password123" } });

        fireEvent.click(screen.getByText("Tovább"));
        await waitFor(() => expect(screen.getByText("Szállítási cím:")));
    });

    test("Shows error messages for invalid input", () => {
        render(
            <BrowserRouter>
                <Regisztracio />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("Tovább"));
        expect(screen.getByText("Felhasználónév nem lehet üres!"));
        expect(screen.getByText("Név nem lehet üres!"));
        expect(screen.getByText("Email nem lehet üres!"));
    });

    test("Handles successful registration", async () => {
        axios.post.mockResolvedValue({ status: 200 });
        render(
            <BrowserRouter>
                <Regisztracio />
            </BrowserRouter>
        );
        
        // Step 1
        fireEvent.change(screen.getByPlaceholderText("Teljes név"), { target: { value: "Teszt Felhasználó" } });
        fireEvent.change(screen.getByPlaceholderText("Felhasználónév"), { target: { value: "tesztuser" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "teszt@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Jelszó"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Jelszó megerősítése"), { target: { value: "password123" } });
        fireEvent.click(screen.getByText("Tovább"));
        
        await waitFor(() => expect(screen.getByText("Szállítási cím:")));
        
        // Step 2
        fireEvent.change(screen.getByPlaceholderText("Irányítószám"), { target: { value: "1234" } });
        fireEvent.change(screen.getByPlaceholderText("Város"), { target: { value: "Budapest" } });
        fireEvent.change(screen.getByPlaceholderText("Utca"), { target: { value: "Fő utca" } });
        fireEvent.change(screen.getByPlaceholderText("Házszám"), { target: { value: "10" } });
        fireEvent.click(screen.getByText("Regisztráció"));
        
        await waitFor(() => expect(screen.getByText("Sikeres regisztráció! Most már bejelentkezhetsz.")));
    });

    test("Handles registration error", async () => {
        axios.post.mockRejectedValue({ response: { data: { message: "Hiba történt a regisztráció során." } } });
        render(
            <BrowserRouter>
                <Regisztracio />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Teljes név"), { target: { value: "Teszt Felhasználó" } });
        fireEvent.change(screen.getByPlaceholderText("Felhasználónév"), { target: { value: "tesztuser" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "teszt@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Jelszó"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Jelszó megerősítése"), { target: { value: "password123" } });
        fireEvent.click(screen.getByText("Tovább"));

        await waitFor(() => expect(screen.getByText("Szállítási cím:")));
        
        fireEvent.change(screen.getByPlaceholderText("Irányítószám"), { target: { value: "1234" } });
        fireEvent.change(screen.getByPlaceholderText("Város"), { target: { value: "Budapest" } });
        fireEvent.change(screen.getByPlaceholderText("Utca"), { target: { value: "Fő utca" } });
        fireEvent.change(screen.getByPlaceholderText("Házszám"), { target: { value: "10" } });
        fireEvent.click(screen.getByText("Regisztráció"));
        
        await waitFor(() => expect(screen.getByText("Hiba történt a regisztráció során.")));
    });
});