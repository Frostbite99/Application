package yte.intern.application.yonetim.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.application.yonetim.Entity.Etkinlik;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

public interface YonetimRepository extends JpaRepository<Etkinlik,Long> {

    Optional<Etkinlik> findByUnique(UUID unique);
    @Transactional
    void deleteByUnique(UUID unique);
}
