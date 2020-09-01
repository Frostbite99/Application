package yte.intern.application.yonetim.DTO;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BasvuruDetaylari {
    public String etkinlik_adı;
    public LocalDate başlangıç_tarihi;
    public LocalDate bitiş_tarihi;
    public String tcKimlikNo;
    public String ad;
    public String soyad;
}
