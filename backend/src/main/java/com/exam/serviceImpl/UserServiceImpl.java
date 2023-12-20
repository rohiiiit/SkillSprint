package com.exam.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		
		User local= this.userRepository.findByUsername(user.getUsername());
		if(local!=null) {
			System.out.println("user is already there..!!");
			throw new Exception("User is already present..!!");
		}else {
			for(UserRole ur:userRoles) {
				this.roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local = this.userRepository.save(user);
		}
		return local;
	}
	
	public User getUser(String username) {
		return this.userRepository.findByUsername(username);
	}

	@Override
	public Optional<User> getUserById(Long id) {
		// TODO Auto-generated method stub
		return this.userRepository.findById(id);
	}

	@Override
	public String deleteUser(Long id) {
		// TODO Auto-generated method stub
		this.userRepository.deleteById(id);
		return "user deleted";
	}

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return this.userRepository.findAll();
	}
	
	@Override
	@Transactional
	public User update(User user) {
		User oldUser = userRepository.findByUsername(user.getUsername());
		oldUser.setFirstName(user.getFirstName());
		oldUser.setLastName(user.getLastName());
		oldUser.setEmail(user.getEmail());
		oldUser.setPhone(user.getPhone());
		return userRepository.save(oldUser);
	}
	
	@Override
	@Transactional
	public User addAdmin(String username) {
		User user = this.userRepository.findByUsername(username);
		Set<UserRole> userRoles = user.getUserRoles();
		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleName("ADMIN");
		for(UserRole ur:userRoles) {
			ur.setRole(role);
		}
		user.setUserRoles(userRoles);
		return this.userRepository.saveAndFlush(user);
	}

	@Override
	@Transactional
	public User removeAdmin(String username) {
		User user = this.userRepository.findByUsername(username);
		Set<UserRole> userRoles = user.getUserRoles();
		Role role = new Role();
		role.setRoleId(44L);
		role.setRoleName("NORMAL");
		for(UserRole ur:userRoles) {
			ur.setRole(role);
		}
		user.setUserRoles(userRoles);
		return this.userRepository.saveAndFlush(user);
	}
}
