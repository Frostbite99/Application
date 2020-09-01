package yte.intern.application.yonetim;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import yte.intern.application.yonetim.DTO.AdminDTO;
import yte.intern.application.yonetim.DTO.BasvuruDetaylari;
import yte.intern.application.yonetim.Entity.Consumer;
import yte.intern.application.yonetim.Entity.Etkinlik;
import yte.intern.application.yonetim.Repository.ConsumerRepository;
import yte.intern.application.yonetim.Repository.YonetimRepository;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class YonetimService {

    private final YonetimRepository yonetimRepository;
    private final ConsumerRepository consumerRepository;

    public List<Etkinlik> listAllEvents() {
        return yonetimRepository.findAll();
    }
    public Optional<Etkinlik> getEvent(UUID unique){return yonetimRepository.findByUnique(unique);}
    public Optional<Consumer> getConsumer(String tcKimlikNo){return consumerRepository.findByTcKimlikNo(tcKimlikNo);}

    public Set<Consumer> getEventApplicants(UUID unique) {
        return yonetimRepository.findByUnique(unique).map(Etkinlik::getBasvuran)
                .orElseThrow(EntityNotFoundException::new);
    }

    public Etkinlik getEtkinlikDTO(Optional<Etkinlik> event) {
        if(event.isPresent()){
            Etkinlik etkinlik = new Etkinlik();
            etkinlik.setName(event.get().getName());
            etkinlik.setStartdate(event.get().getStartdate());
            etkinlik.setEnddate(event.get().getEnddate());
            etkinlik.setCap(event.get().getCap());
            etkinlik.setUnique(event.get().getUnique());

            return etkinlik;
        }
        else {
            throw new EntityNotFoundException();
        }
    }

    public String authenticate(AdminDTO adminDTO){
    if(adminDTO.username.equals("admin") && adminDTO.password.equals("admin")){
        return "OK!";
    }
        else {
        return "NOPE";
    }}

    public Etkinlik addEvent(Etkinlik event){
        return yonetimRepository.save(event);
    }

    public void deleteEvent(UUID unique){
        Optional<Etkinlik> etkinlikOptional = yonetimRepository.findByUnique(unique);
        if (java.time.LocalDate.now().isBefore(etkinlikOptional.get().getStartdate())){yonetimRepository.deleteByUnique(unique);}
        else {
            throw new EntityNotFoundException();
        }
    }

    @Transactional
    public Etkinlik updateEvent(UUID unique, Etkinlik event) {
        Optional<Etkinlik> etkinlikOptional = yonetimRepository.findByUnique(unique);
        if (etkinlikOptional.isPresent() && java.time.LocalDate.now().isBefore(etkinlikOptional.get().getStartdate())) {
            updateEtkinlikFromDB(event, etkinlikOptional.get());
            yonetimRepository.deleteByUnique(unique);
            return yonetimRepository.save(event);
        } else {
            throw new EntityNotFoundException();
        }

    }

    private void updateEtkinlikFromDB(Etkinlik event, Etkinlik eventFromDB) {
        eventFromDB.setName(event.getName());
        eventFromDB.setEnddate(event.getEnddate());
        eventFromDB.setStartdate(event.getStartdate());
        eventFromDB.setCap(event.getCap());
        eventFromDB.setUnique(event.getUnique());
    }
    @Transactional
    public String basvur(Etkinlik etkinlik, Consumer consumer){
        Set<Consumer> yeniliste = etkinlik.getBasvuran();

        if(etkinlik.hasCons(consumer) || (etkinlik.getBasvuran().size() >= etkinlik.getCap())){
            throw new IllegalStateException();
        }


        yeniliste.add(consumer);
        etkinlik.setBasvuran(yeniliste);
        yonetimRepository.save(etkinlik);
        return torettoMapper(consumer,etkinlik);

    }

    public List<Etkinlik> listCurrentEvents() {
        if(yonetimRepository.findAll().size() == 0){
            throw new NoSuchElementException();
        }
        else{
        List<Etkinlik> hobba = yonetimRepository.findAll()
                .stream()
                .filter(c -> java.time.LocalDate.now().isBefore(c.getStartdate()))
                .collect(Collectors.toList());
        return hobba;}
    }

    public String torettoMapper(Consumer consData, Etkinlik eventData){
        BasvuruDetaylari toretto = new BasvuruDetaylari();
        toretto.setAd(consData.getAd());
        toretto.setSoyad(consData.getSoyad());
        toretto.setTcKimlikNo(consData.getTcKimlikNo());
        toretto.setEtkinlik_adı(eventData.getName());
        toretto.setBaşlangıç_tarihi(eventData.getStartdate());
        toretto.setBitiş_tarihi(eventData.getEnddate());
        return toretto.toString();

    }


}