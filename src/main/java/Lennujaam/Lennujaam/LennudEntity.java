package Lennujaam.Lennujaam;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;


@Getter
@Setter
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "lennud_entity")
public class LennudEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String origin;
    private String destination;
    private LocalDate date;
    private LocalTime time;
    private Double price;
    private Integer availableSeats;
    private Integer bookedSeats;


}
