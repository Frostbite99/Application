package yte.intern.application.yonetim.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import yte.intern.application.yonetim.Validators.TcKimlikNo;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class ConsumerDTO {

    @NotBlank(message = "Lütfen Adınızı Girin!")
    public final String ad;

    @NotBlank(message = "Lütfen Soyadınızı Girin!")
    public final String soyad;

    @TcKimlikNo(message = "Lütfen Geçerli Bir TC Kimlik Numarası Girin!")
    public final String tcKimlikNo;

    public ConsumerDTO(@JsonProperty("ad") String ad,
                   @JsonProperty("soyad") String soyad,
                   @JsonProperty("tcKimlikNo") String tcKimlikNo) {
        this.ad = ad;
        this.soyad = soyad;
        this.tcKimlikNo = tcKimlikNo;
    }
}
