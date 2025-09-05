package com.team04.logsheetmngsys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team04.logsheetmngsys.entity.RoleMenuItem;

import jakarta.transaction.Transactional;

@Repository
public interface RoleMenuItemRepository extends JpaRepository<RoleMenuItem, Long> {
	
	List<RoleMenuItem> findByRoleId(Long roleId);
	
    void deleteByRoleId(Long roleId);

    void deleteByRoleIdAndMenuItemId(Long roleId, Long menuItemId);

    boolean existsByRole_IdAndMenuItem_Id(Long roleId, Long menuItemId);
}