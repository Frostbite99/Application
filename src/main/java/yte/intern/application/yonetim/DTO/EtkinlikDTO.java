package yte.intern.application.yonetim.DTO;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Builder
public class EtkinlikDTO {


    public final UUID unique;

    @NotBlank(message = "ETKINLIK ADI BOS OLAMAZ")
    public final String name;

    public final LocalDate startdate;

    public final LocalDate enddate;

    public final long cap;

    @AssertTrue
    public boolean isDateValid(){
        return startdate.isBefore(enddate);
    }
}
