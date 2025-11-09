package com.ram.leave.service;

import com.ram.leave.model.Leave;
import com.ram.leave.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepo;

    @Autowired
    private EmailService emailService;

    // ✅ Apply for Leave
    public void applyLeave(Leave leave) {
        leave.setStatus("PENDING");
        leaveRepo.save(leave);
    }

    // ✅ Get My Leaves
    public List<Leave> getMyLeaves(String email) {
        return leaveRepo.findByEmail(email);
    }

    // ✅ Get all Pending Leaves
    public List<Leave> getPendingLeaves() {
        return leaveRepo.findByStatus("PENDING");
    }

    // ✅ Approve Leave
    public void approveLeave(Long id) {
        Leave leave = leaveRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found with ID: " + id));

        leave.setStatus("APPROVED");
        leaveRepo.save(leave);

        String subject = "Leave Approved";
        String body = "Hi, your leave from " + leave.getFromDate() + " to " + leave.getToDate() + " is approved.";

        try {
            emailService.sendEmail(leave.getEmail(), subject, body);
        } catch (Exception e) {
            System.out.println("Failed to send approval email: " + e.getMessage());
        }
    }

    // ✅ Reject Leave (NEW)
    public void rejectLeave(Long id) {
        Leave leave = leaveRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found with ID: " + id));

        leave.setStatus("REJECTED");
        leaveRepo.save(leave);

        String subject = "Leave Rejected";
        String body = "Hi, your leave from " + leave.getFromDate() + " to " + leave.getToDate() + " has been rejected.";

        try {
            emailService.sendEmail(leave.getEmail(), subject, body);
        } catch (Exception e) {
            System.out.println("Failed to send rejection email: " + e.getMessage());
        }
    }
}
