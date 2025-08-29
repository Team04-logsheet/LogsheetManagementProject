package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.GroupTableDTO;
import java.util.List;

public interface GroupTableService {
    GroupTableDTO createGroup(GroupTableDTO dto);
    GroupTableDTO updateGroup(Long id, GroupTableDTO dto);
    GroupTableDTO getGroupById(Long id);
    List<GroupTableDTO> getAllGroups();
    void deleteGroup(Long id);
    
}





