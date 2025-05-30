// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { DataService } from './data.service';

// describe('DataService', () => {
//   let service: DataService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [DataService],
//     });
//     service = TestBed.inject(DataService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should fetch all countries', () => {
//     const mockCountries = [{ id: '1', name: 'United States' }];
//     service.getAllCountries().subscribe((countries) => {
//       expect(countries).toEqual(mockCountries);
//     });

//     const req = httpMock.expectOne('assets/dttb.json');
//     expect(req.request.method).toBe('GET');
//     req.flush({ countries: mockCountries });
//   });
//   it('should fetch all states', () => {
//     const mockStates = [{ id: '1', name: 'Karnataka' }];
//     service.getAllStates().subscribe((states) => {
//       expect(states).toEqual(mockStates);
//     });

//     const req = httpMock.expectOne('assets/dttb.json');
//     expect(req.request.method).toBe('GET');
//     req.flush({ states: mockStates });
//   });

//   it('should fetch all cities', () => {
//     const mockCities = [{ id: '1', name: 'Bangalore' }];
//     service.getAllCities().subscribe((cities) => {
//       expect(cities).toEqual(mockCities);
//     });

//     const req = httpMock.expectOne('assets/dttb.json');
//     expect(req.request.method).toBe('GET');
//     req.flush({ citys: mockCities });
//   });

//   it('should fetch all documents', () => {
//     const mockDocuments = [{ id: '1', name: 'Aadhar Card' }];
//     service.getAllDocuments().subscribe((documents) => {
//       expect(documents).toEqual(mockDocuments);
//     });

//     const req = httpMock.expectOne('assets/dttb.json');
//     expect(req.request.method).toBe('GET');
//     req.flush({ documents: mockDocuments });
//   });

//   it('should fetch all home types', () => {
//     const mockHomeTypes = [{ id: '1', name: 'Home' }];
//     service.getAllHomeTypes().subscribe((homeTypes) => {
//       expect(homeTypes).toEqual(mockHomeTypes);
//     });

//     const req = httpMock.expectOne('assets/dttb.json');
//     expect(req.request.method).toBe('GET');
//     req.flush({ homeTypes: mockHomeTypes });
//   });
// });
