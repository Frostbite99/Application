package yte.intern.application.yonetim.Mapper;

import org.mapstruct.Mapper;
import yte.intern.application.yonetim.DTO.EtkinlikDTO;
import yte.intern.application.yonetim.Entity.Etkinlik;

import java.util.List;

@Mapper(componentModel = "spring")
public interface YonetimMapper {
    EtkinlikDTO mapToDto(Etkinlik event);

    Etkinlik mapToEntity(EtkinlikDTO eventDTO);

    List<EtkinlikDTO> mapToDto(List<Etkinlik> eventList);

    List<Etkinlik> mapToEntity(List<EtkinlikDTO> eventDTOList);
}
