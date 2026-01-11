package com.app.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.Entity.Organization;

@SuppressWarnings("serial")
public class CustomOrganizationDetails implements UserDetails {
    private Organization organization;

    public CustomOrganizationDetails(Organization organization) {
        this.organization = organization;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority(organization.getRole().name()));
    }

	@Override
    public String getPassword() {
        return organization.getPassword();
    }

    @Override
    public String getUsername() {
        return organization.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getRole() {
        return organization.getRole().name();
    }

    public Long getId() {
        return organization.getId();
    }


	public String getName() {
		return organization.getName();
	}

}
