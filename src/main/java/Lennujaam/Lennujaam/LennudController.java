package Lennujaam.Lennujaam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LennudController {

    @Autowired
    LennudRepository lennudRepository;

    @GetMapping("lennud")
    public List<LennudEntity> getLennud() {
        return lennudRepository.findAll();
    }

    @PostMapping("lennud")
    public List<LennudEntity> addLennud(@RequestBody LennudEntity lennud){
        lennudRepository.save(lennud);
        return lennudRepository.findAll();
    }
    @PutMapping("lennud/{id}")
    public LennudEntity uuendaLend(@PathVariable Long id, @RequestBody LennudEntity lennud) {
        if (!lennudRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        lennud.setId(id);
        return lennudRepository.save(lennud);
    }

    @DeleteMapping("lennud/{id}")
    public List<LennudEntity> kustutaLend(@PathVariable Long id) {
        lennudRepository.deleteById(id);
        return lennudRepository.findAll();
    }
}
