package com.team04.logsheetmngsys.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.team04.logsheetmngsys.dto.GroupTableDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseGroupResponseDTO;
import com.team04.logsheetmngsys.entity.CourseGroup;
import com.team04.logsheetmngsys.entity.GroupTable;

public class CourseGroupMapper {

    // Convert a single GroupTable to DTO
    public static GroupTableDTO toGroupTableDTO(GroupTable group) {
        if (group == null) return null;
        return new GroupTableDTO(
                group.getId(),
                group.getName(),
                group.getDescription()
        );
    }

    // Convert a single CourseGroup to DTO
    public static CourseGroupResponseDTO toCourseGroupResponseDTO(CourseGroup courseGroup) {
        if (courseGroup == null) return null;
        return new CourseGroupResponseDTO(
                courseGroup.getId(),
                courseGroup.getCourse().getId(),
                toGroupTableDTO(courseGroup.getGroup())
        );
    }

    // Convert list of CourseGroup to list of DTOs
    public static List<CourseGroupResponseDTO> toCourseGroupResponseDTOList(List<CourseGroup> courseGroups) {
        return courseGroups.stream()
                .map(CourseGroupMapper::toCourseGroupResponseDTO)
                .collect(Collectors.toList());
    }
}

