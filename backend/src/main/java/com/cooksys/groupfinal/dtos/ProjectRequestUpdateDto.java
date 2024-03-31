package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ProjectRequestUpdateDto {

    private String name;
    private String description;
    private boolean active;

    public Boolean getActive() {
        return active;
    }

}
