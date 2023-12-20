package com.exam.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@RestController
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping("/user")
	public User createUser(@RequestBody User user) throws Exception {
		user.setProfile("default.png");
		Set<UserRole> roles = new HashSet<>();
		Role role = new Role();
		role.setRoleId(44L);
		role.setRoleName("NORMAL");
//		going to password BcryptPasswordEncoder
		
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		
		UserRole userRole=new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		
		return this.userService.createUser(user, roles);
	}
	
	@GetMapping("/user/get")
	public List<User> getAllUser(){
		return this.userService.getAllUser();
	}
	
	@GetMapping("/user/{username}")
	public User getUser(@PathVariable String username) {
		return this.userService.getUser(username);
	}
	
	@GetMapping("/user/get/{id}")
	public Optional<User> getUserById(@PathVariable Long id) {
		return this.userService.getUserById(id);
	}
	
	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable Long id) {
		this.userService.deleteUser(id);
	}
	
	@PutMapping("/user/update")
	public User updateUser(@RequestBody User user) {
		return userService.update(user);
	}
	
	@PatchMapping("admin/add/{username}")
	public User addAdmin(@PathVariable String username) throws Exception {
		return this.userService.addAdmin(username);
	}
	
	@PatchMapping("/admin/remove/{username}")
	public User removeAdmin(@PathVariable String username) throws Exception {
		return this.userService.removeAdmin(username);
		
	}
	
}
