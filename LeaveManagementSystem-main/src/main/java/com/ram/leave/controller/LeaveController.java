package com.ram.leave.controller;

import com.ram.leave.model.Leave;
import com.ram.leave.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leave")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    // ✅ Apply Leave
    @PostMapping("/apply")
    public String apply(@RequestBody Leave leave) {
        leaveService.applyLeave(leave);
        return "Leave Applied";
    }

    // ✅ Approve Leave
    @PostMapping("/approve/{id}")
    public String approve(@PathVariable Long id) {
        leaveService.approveLeave(id);
        return "Leave Approved";
    }

    // ✅ Reject Leave
    @PostMapping("/reject/{id}")
    public String reject(@PathVariable Long id) {
        leaveService.rejectLeave(id);
        return "Leave Rejected";
    }

    // ✅ Get My Leaves
    @GetMapping("/mine")
    public List<Leave> myLeaves(@RequestParam String email) {
        return leaveService.getMyLeaves(email);
    }

    // ✅ Get Pending Leaves
    @GetMapping("/pending")
    public List<Leave> pending() {
        return leaveService.getPendingLeaves();
    }
}
