package yte.intern.application.yonetim;


import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.application.yonetim.DTO.AdminDTO;
import yte.intern.application.yonetim.DTO.ConsumerDTO;
import yte.intern.application.yonetim.DTO.EtkinlikDTO;
import yte.intern.application.yonetim.Entity.Consumer;
import yte.intern.application.yonetim.Entity.Etkinlik;
import yte.intern.application.yonetim.Mapper.ConsumerMapper;
import yte.intern.application.yonetim.Mapper.YonetimMapper;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class YonetimController {
    private final YonetimService yonetimService;
    private final YonetimMapper yonetimMapper;
    private final ConsumerMapper consumerMapper;

    @GetMapping("/list")
    public List<EtkinlikDTO> listAllEvents() {
        List<Etkinlik> event = yonetimService.listAllEvents();
        return yonetimMapper.mapToDto(event);
    }

    @GetMapping("/user")
    public List<EtkinlikDTO> listCurrentEvents(){
        List<Etkinlik> event = yonetimService.listCurrentEvents();
        return yonetimMapper.mapToDto(event);
    }

    @GetMapping("/update/{id}")
    public EtkinlikDTO getEvent(@PathVariable UUID id){
        Optional<Etkinlik> event = yonetimService.getEvent(id);
         return yonetimMapper.mapToDto(yonetimService.getEtkinlikDTO(event));
    }

    @GetMapping("/basvuran/{id}")
    public List<ConsumerDTO> getBasvuran(@PathVariable UUID id){
        Set<Consumer> basvuranlar = yonetimService.getEventApplicants(id);
        return consumerMapper.mapToDto(new ArrayList<>(basvuranlar));
    }

    @PostMapping("/login")
    public String authenticate(@RequestBody AdminDTO adminDTO){
        return yonetimService.authenticate(adminDTO);
    }

    @PostMapping("/basvur/{id}")
    public String basvur(@PathVariable UUID id, @Valid @RequestBody ConsumerDTO consumerDTO){
        Optional<Etkinlik> etkinlik = yonetimService.getEvent(id);
        Consumer consumer = consumerMapper.mapToEntity(consumerDTO);
        String halledildi = yonetimService.basvur(etkinlik.get(),consumer);
        return halledildi;

    }


    @PostMapping("/add")
    public EtkinlikDTO addEvent(@Valid @RequestBody EtkinlikDTO eventDTO) {
        Etkinlik event = yonetimMapper.mapToEntity(eventDTO);
        Etkinlik addedEvent = yonetimService.addEvent(event);
        return yonetimMapper.mapToDto(addedEvent);
    }

    @PutMapping("/update/{id}")
    public EtkinlikDTO updateEvent(@PathVariable UUID id,@Valid @RequestBody EtkinlikDTO eventDTO) {
        Etkinlik event = yonetimMapper.mapToEntity(eventDTO);
        Etkinlik updatedEvent = yonetimService.updateEvent(id, event);
        return yonetimMapper.mapToDto(updatedEvent);
    }

    @DeleteMapping("/delete{id}")
    public void deleteEvent(@PathVariable UUID id) {
        yonetimService.deleteEvent(id);
    }



}
