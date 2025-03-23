package Lennujaam.Lennujaam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @DeleteMapping("lennud/{id}")
    public List<LennudEntity> kustutaLend(@PathVariable Long id) {
        lennudRepository.deleteById(id);
        return lennudRepository.findAll();
    }
}
