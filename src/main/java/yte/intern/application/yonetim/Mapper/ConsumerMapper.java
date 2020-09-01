package yte.intern.application.yonetim.Mapper;

import org.mapstruct.Mapper;
import yte.intern.application.yonetim.DTO.ConsumerDTO;
import yte.intern.application.yonetim.DTO.EtkinlikDTO;
import yte.intern.application.yonetim.Entity.Consumer;


import java.util.List;

@Mapper(componentModel = "spring")
public interface ConsumerMapper {

    ConsumerDTO mapToDto(Consumer consumer);

    Consumer mapToEntity(ConsumerDTO consumerDTO);

    List<ConsumerDTO> mapToDto(List<Consumer> consumerList);

    List<Consumer> mapToEntity(List<ConsumerDTO> consumerDTOList);
}
