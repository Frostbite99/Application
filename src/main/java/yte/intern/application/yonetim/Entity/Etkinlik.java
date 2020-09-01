package yte.intern.application.yonetim.Entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.application.common.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "STUDENT_SEQ")
public class Etkinlik extends BaseEntity {

    @Column(name = "UUID")
    private UUID unique;

    @NotBlank(message = "ETKINLIK ADI BOS OLAMAZ")
    @Column(name = "NAME")
    private String name;

    @FutureOrPresent(message = "Geçmiş bir tarih girmeye çalıştınız!")
    @Column(name = "START_DATE")
    private LocalDate startdate;

    @FutureOrPresent(message = "Geçmiş bir tarih girmeye çalıştınız!")
    @Column(name = "END_DATE")
    private LocalDate enddate;

    @Column(name = "CAP")
    private Long cap;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_tc")
    private Set<Consumer> basvuran;

    public boolean hasCons(Consumer cons) {
        if(basvuran.size() == 0){
            return false;
        }
        else{
        return basvuran.stream()
                .anyMatch(it -> it.getTcKimlikNo().equals(cons.getTcKimlikNo()));}
    }
}
