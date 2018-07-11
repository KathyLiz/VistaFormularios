import { TestBed, inject } from '@angular/core/testing';

import { GeneradorFomularioService } from './generador-fomulario.service';

describe('GeneradorFomularioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneradorFomularioService]
    });
  });

  it('should be created', inject([GeneradorFomularioService], (service: GeneradorFomularioService) => {
    expect(service).toBeTruthy();
  }));
});
