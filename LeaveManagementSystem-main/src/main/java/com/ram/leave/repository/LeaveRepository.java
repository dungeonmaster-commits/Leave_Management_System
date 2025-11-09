package com.ram.leave.repository;

import com.ram.leave.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByEmail(String email);
    List<Leave> findByStatus(String status);
}