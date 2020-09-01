package yte.intern.application.yonetim.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yte.intern.application.common.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "BOOK_SEQ")
@AllArgsConstructor
@NoArgsConstructor
public class Consumer extends BaseEntity {


    @Column(name = "AD")
    private String ad;

    @Column(name = "SOYAD")
    private String soyad;

    @Column(name = "TC_KIMLIK_NO")
    private String tcKimlikNo;


}