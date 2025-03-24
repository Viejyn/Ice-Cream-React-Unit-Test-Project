import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./index"; // Card bileşenini içe aktar
import "@testing-library/jest-dom/extend-expect";

describe("Card Component", () => {
    const mockData = { name: "Vanilla", imagePath: "/images/vanilla.png" };

    test("Başlangıçta ürün sayısı 0 olmalı", () => {
        render(<Card data={mockData} basket={[]} setBasket={() => {}} />);
        
        // Başlangıç sayısını kontrol et
        const amount = screen.getByText("0");
        expect(amount).toBeInTheDocument();
    });

    test("Ekle butonuna basıldığında sayı artmalı", () => {
        const mockSetBasket = jest.fn();
        render(<Card data={mockData} basket={[]} setBasket={mockSetBasket} />);

        const addButton = screen.getByText("Ekle");

        fireEvent.click(addButton);

        // Sepete ekleme fonksiyonunun çağrıldığını kontrol et
        expect(mockSetBasket).toHaveBeenCalledTimes(1);
        expect(mockSetBasket).toHaveBeenCalledWith([mockData]);
    });

    test("Sıfırla butonuna basıldığında ürünler silinmeli", () => {
        const mockSetBasket = jest.fn();
        const basket = [mockData, mockData];

        render(<Card data={mockData} basket={basket} setBasket={mockSetBasket} />);

        const resetButton = screen.getByText("Sıfırla");

        fireEvent.click(resetButton);

        // Sepetteki tüm aynı ürünlerin silindiğini kontrol et
        expect(mockSetBasket).toHaveBeenCalledWith([]);
    });
});
