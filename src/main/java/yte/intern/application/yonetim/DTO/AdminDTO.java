package yte.intern.application.yonetim.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminDTO {
    public String username;
    public String password;

    public AdminDTO(@JsonProperty("kadı") String username,
                       @JsonProperty("sifre") String password){
        this.username = username;
        this.password = password;

    }
}
