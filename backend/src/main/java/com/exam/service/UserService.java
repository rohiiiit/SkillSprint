package com.exam.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.exam.model.User;
import com.exam.model.UserRole;

public interface UserService {
	
//	create user
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;
	
//	get user
	public User getUser(String username);

	public Optional<User> getUserById(Long id);

	public String deleteUser(Long id);

	public List<User> getAllUser();
	
	public User update(User user);

	public User addAdmin(String username);

	public User removeAdmin(String username);

}
