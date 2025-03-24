import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

/* 
 ! Seçiciler
 ? Query [All]  BySelector(BySeçici)
 * Query > get | find | query
 * get => element başlangıçta DOM'da var ise kullanılır
 * find => elementin ne zaman ekrana basılacağı belli değilse (async ise)
 * query => get ile benzer çalışır. Farkı: elemanı bulamadığı zaman null 
   döndürürür, hata vermez.
 * not: find metodu promise döndürür. bu yüzden async await vb. ile ele
   alınması gerekir.
 * all kullandığımız zaman elemanlar geriye hep dizi içerisinde döner.
*/

test("Veri API'den geldikten sonra ekrana kartlar basılır", async () => {
    render(<Scoops />);

// ekrana basılan bütün kartları çağırma (resimlerini)
    const images = await screen.findAllByRole("img", {
        name: 'çeşit-resmi',
    });

// gelen resimlerin sayısı 2 den büyük veya 2 ye eşit mi
    expect(images.length).toBeGreaterThanOrEqual(2);
});

// Test Driven Development (Red-to-Green)
test("Çeşit ekleme ve sıfırlamanın toplam fiyata etkisi", async () => {
    render(<Scoops />);
    const user = userEvent.setup();

    // toplam fiyata erişme
    const total = screen.getByRole("heading", { 
        name: /çeşitler ücreti/i, 
        //insensitive -> büyük/küçük harf duyarlılığı kalkar 
        // ve yazının tamamını yazmama gerek kalmaz  
    });

    // toplam fiyat 0'dan başlar
    expect(total).toHaveTextContent("0");

    // bütün ekle butonlarını çağırma
    const addButtons = await screen.findAllByRole("button", { 
        name: /ekle/i, 
    });

    // bütün sıfırla butonlarını çağırma
    const delButtons = await screen.findAllByRole("button", {
        name: /sıfırla/i,
    });

    // bir tane çeşit ekle ve fiyatı kontrol et
    await user.click(addButtons[0]);
    expect(total).toHaveTextContent("20");

    // iki tane daha ekle ve fiyatı kontrol et
    await user.dblClick(addButtons[2]);
    expect(total).toHaveTextContent("60");

    // 1 tane eklenen elemanı sıfırla
    await user.click(delButtons[0]);
    expect(total).toHaveTextContent("40");

    // 2 tane eklenen elemanı çıkarma
    await user.click(delButtons[2]);
    expect(total).toHaveTextContent("0");
});