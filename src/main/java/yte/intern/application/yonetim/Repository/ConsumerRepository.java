package yte.intern.application.yonetim.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.application.yonetim.Entity.Consumer;
import yte.intern.application.yonetim.Entity.Etkinlik;

import java.util.Optional;

public interface ConsumerRepository extends JpaRepository<Consumer,Long> {

    Optional<Consumer> findByTcKimlikNo(String tcKimlikNo);
}
