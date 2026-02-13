/**
 * Comprehensive worldwide vehicle marques and models database
 * Every marque and model a user could possibly own
 * Used by ConversionForm for interactive dropdowns
 */

export interface VehicleMarque {
  name: string;
  models: string[];
}

export const vehicleMarques: VehicleMarque[] = [
  // ── FRENCH ──
  { name: 'Renault', models: ['Clio', 'Clio II', 'Clio III', 'Clio IV', 'Clio V', 'Mégane', 'Mégane II', 'Mégane III', 'Mégane IV', 'Mégane E-Tech', 'Captur', 'Captur II', 'Kadjar', 'Scénic', 'Scénic II', 'Scénic III', 'Scénic IV', 'Grand Scénic', 'Twingo', 'Twingo II', 'Twingo III', 'Zoé', 'Kangoo', 'Kangoo II', 'Kangoo III', 'Trafic', 'Trafic II', 'Trafic III', 'Master', 'Master II', 'Master III', 'Laguna', 'Laguna II', 'Laguna III', 'Espace', 'Espace IV', 'Espace V', 'Espace VI', 'Koleos', 'Koleos II', 'Arkana', 'Austral', 'Talisman', 'Fluence', 'Latitude', 'Vel Satis', 'Safrane', 'Avantime', 'Wind', 'Modus', 'Grand Modus', 'Express', 'R4', 'R5', 'R9', 'R11', 'R19', 'R21', 'R25', 'Fuego', 'Alpine A110', 'Alpine A310', 'Rafale', 'Symbioz'] },
  { name: 'Peugeot', models: ['106', '107', '108', '205', '206', '206+', '207', '208', '208 II', 'e-208', '301', '305', '306', '307', '308', '308 II', '308 III', 'e-308', '309', '405', '406', '407', '408', '508', '508 II', 'e-508', '605', '607', '806', '807', '1007', '2008', '2008 II', 'e-2008', '3008', '3008 II', 'e-3008', '4007', '4008', '5008', '5008 II', 'e-5008', 'Rifter', 'e-Rifter', 'Partner', 'Partner II', 'Partner III', 'Expert', 'Expert II', 'Expert III', 'Boxer', 'Boxer II', 'Boxer III', 'Bipper', 'RCZ', 'iOn', 'Traveller', 'e-Traveller'] },
  { name: 'Citroën', models: ['C1', 'C2', 'C3', 'C3 II', 'C3 III', 'C3 Aircross', 'C3 Picasso', 'C3 Pluriel', 'C4', 'C4 II', 'C4 III', 'ë-C4', 'C4 Cactus', 'C4 Picasso', 'C4 Grand Picasso', 'C4 SpaceTourer', 'Grand C4 SpaceTourer', 'C5', 'C5 II', 'C5 Aircross', 'C5 X', 'C6', 'C8', 'C-Elysée', 'C-Crosser', 'C-Zero', 'Ami', 'Berlingo', 'Berlingo II', 'Berlingo III', 'ë-Berlingo', 'Jumpy', 'Jumpy II', 'Jumpy III', 'ë-Jumpy', 'Jumper', 'Jumper II', 'Jumper III', 'Nemo', 'Saxo', 'AX', 'BX', 'ZX', 'Xsara', 'Xsara Picasso', 'Xantia', 'XM', 'CX', 'GS', 'DS3', 'DS4', 'DS5', 'SpaceTourer', 'ë-SpaceTourer', 'Visa', 'LN', '2CV', 'Dyane', 'Méhari'] },
  { name: 'DS', models: ['DS 3', 'DS 3 Crossback', 'E-Tense DS 3', 'DS 4', 'DS 4 II', 'DS 5', 'DS 7', 'DS 7 Crossback', 'DS 9'] },
  { name: 'Dacia', models: ['Sandero', 'Sandero II', 'Sandero III', 'Sandero Stepway', 'Sandero Stepway II', 'Sandero Stepway III', 'Duster', 'Duster II', 'Duster III', 'Jogger', 'Spring', 'Logan', 'Logan II', 'Logan III', 'Logan MCV', 'Logan MCV II', 'Lodgy', 'Dokker', 'Solenza', 'Nova'] },
  { name: 'Alpine', models: ['A110', 'A110 S', 'A110 R', 'A110 GT', 'A290', 'A310', 'A610'] },

  // ── GERMAN ──
  { name: 'Volkswagen', models: ['Golf', 'Golf II', 'Golf III', 'Golf IV', 'Golf V', 'Golf VI', 'Golf VII', 'Golf VIII', 'Golf Plus', 'Golf Sportsvan', 'Golf Variant', 'Polo', 'Polo III', 'Polo IV', 'Polo V', 'Polo VI', 'Tiguan', 'Tiguan II', 'Tiguan Allspace', 'T-Roc', 'T-Cross', 'Passat', 'Passat B5', 'Passat B6', 'Passat B7', 'Passat B8', 'Passat B9', 'Passat CC', 'Touran', 'Touran II', 'Touareg', 'Touareg II', 'Touareg III', 'Arteon', 'Arteon Shooting Brake', 'ID.3', 'ID.4', 'ID.5', 'ID.7', 'ID. Buzz', 'Up!', 'e-Up!', 'Caddy', 'Caddy V', 'Transporter', 'Transporter T5', 'Transporter T6', 'Transporter T7', 'Multivan', 'Caravelle', 'Crafter', 'Crafter II', 'Amarok', 'Amarok II', 'Sharan', 'Sharan II', 'Scirocco', 'Scirocco III', 'Beetle', 'New Beetle', 'Jetta', 'Jetta VI', 'Bora', 'Eos', 'Fox', 'Lupo', 'Phaeton', 'Taigo', 'Corrado', 'Vento', 'CC'] },
  { name: 'BMW', models: ['Série 1 (E87)', 'Série 1 (F20)', 'Série 1 (F40)', 'Série 2 Active Tourer (F45)', 'Série 2 Active Tourer (U06)', 'Série 2 Coupé (F22)', 'Série 2 Coupé (G42)', 'Série 2 Gran Coupé (F44)', 'Série 3 (E46)', 'Série 3 (E90)', 'Série 3 (F30)', 'Série 3 (G20)', 'Série 3 Touring', 'Série 4 Coupé', 'Série 4 Gran Coupé', 'Série 4 Cabriolet', 'Série 5 (E39)', 'Série 5 (E60)', 'Série 5 (F10)', 'Série 5 (G30)', 'Série 5 (G60)', 'Série 5 Touring', 'Série 6 (E63)', 'Série 6 Gran Turismo', 'Série 7 (E65)', 'Série 7 (F01)', 'Série 7 (G11)', 'Série 7 (G70)', 'Série 8 Coupé', 'Série 8 Gran Coupé', 'Série 8 Cabriolet', 'X1 (E84)', 'X1 (F48)', 'X1 (U11)', 'X2 (F39)', 'X2 (U10)', 'X3 (E83)', 'X3 (F25)', 'X3 (G01)', 'X3 (G45)', 'X4 (F26)', 'X4 (G02)', 'X5 (E53)', 'X5 (E70)', 'X5 (F15)', 'X5 (G05)', 'X6 (E71)', 'X6 (F16)', 'X6 (G06)', 'X7 (G07)', 'XM', 'Z3', 'Z4 (E85)', 'Z4 (E89)', 'Z4 (G29)', 'i3', 'i4', 'i5', 'i7', 'iX', 'iX1', 'iX2', 'iX3', 'M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'M135i', 'M235i', 'M240i', 'M340i', 'M440i', 'M550i', 'M760i'] },
  { name: 'Mercedes-Benz', models: ['Classe A (W168)', 'Classe A (W169)', 'Classe A (W176)', 'Classe A (W177)', 'Classe B (W245)', 'Classe B (W246)', 'Classe B (W247)', 'Classe C (W202)', 'Classe C (W203)', 'Classe C (W204)', 'Classe C (W205)', 'Classe C (W206)', 'Classe C Break', 'Classe C Coupé', 'Classe E (W210)', 'Classe E (W211)', 'Classe E (W212)', 'Classe E (W213)', 'Classe E (W214)', 'Classe E Break', 'Classe E Coupé', 'Classe E Cabriolet', 'Classe S (W220)', 'Classe S (W221)', 'Classe S (W222)', 'Classe S (W223)', 'Classe G (W463)', 'Classe V (W447)', 'Classe V (W638)', 'CLA (C117)', 'CLA (C118)', 'CLA Shooting Brake', 'CLK (C208)', 'CLK (C209)', 'CLS (C219)', 'CLS (C257)', 'GLA (X156)', 'GLA (H247)', 'GLB (X247)', 'GLC (X253)', 'GLC (X254)', 'GLC Coupé', 'GLE (W166)', 'GLE (V167)', 'GLE Coupé', 'GLS (X166)', 'GLS (X167)', 'GLK (X204)', 'ML (W163)', 'ML (W164)', 'ML (W166)', 'SL (R129)', 'SL (R230)', 'SL (R231)', 'SL (R232)', 'SLC (R172)', 'SLK (R170)', 'SLK (R171)', 'SLK (R172)', 'AMG GT', 'AMG GT 4 portes', 'AMG ONE', 'EQA', 'EQB', 'EQC', 'EQE', 'EQE SUV', 'EQS', 'EQS SUV', 'EQV', 'Vito', 'Vito II', 'Vito III', 'Sprinter', 'Sprinter II', 'Sprinter III', 'Citan', 'Citan II'] },
  { name: 'Audi', models: ['A1', 'A1 Sportback', 'A2', 'A3', 'A3 Sportback', 'A3 Berline', 'A3 Cabriolet', 'A4', 'A4 Avant', 'A4 Allroad', 'A4 Cabriolet', 'A5', 'A5 Sportback', 'A5 Cabriolet', 'A6', 'A6 Avant', 'A6 Allroad', 'A7 Sportback', 'A8', 'A8 L', 'Q2', 'Q3', 'Q3 Sportback', 'Q4 e-tron', 'Q4 Sportback e-tron', 'Q5', 'Q5 Sportback', 'Q6 e-tron', 'Q7', 'Q8', 'Q8 e-tron', 'Q8 Sportback e-tron', 'e-tron', 'e-tron Sportback', 'e-tron GT', 'RS e-tron GT', 'TT', 'TT Roadster', 'TTS', 'R8', 'R8 Spyder', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'RS Q3', 'RS Q8', 'S1', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ2', 'SQ5', 'SQ7', 'SQ8'] },
  { name: 'Opel', models: ['Corsa', 'Corsa B', 'Corsa C', 'Corsa D', 'Corsa E', 'Corsa F', 'Corsa-e', 'Astra', 'Astra G', 'Astra H', 'Astra J', 'Astra K', 'Astra L', 'Astra Electric', 'Mokka', 'Mokka B', 'Mokka-e', 'Crossland', 'Crossland X', 'Grandland', 'Grandland X', 'Grandland Electric', 'Combo', 'Combo Life', 'Combo-e Life', 'Vivaro', 'Vivaro B', 'Vivaro C', 'Vivaro-e', 'Movano', 'Movano B', 'Movano C', 'Movano-e', 'Zafira', 'Zafira B', 'Zafira Tourer', 'Zafira Life', 'Zafira-e Life', 'Insignia', 'Insignia B', 'Meriva', 'Meriva B', 'Adam', 'Karl', 'Cascada', 'Ampera', 'Ampera-e', 'Vectra', 'Vectra B', 'Vectra C', 'Omega', 'Omega B', 'Signum', 'Agila', 'Antara', 'Frontera', 'Monterey', 'Speedster', 'Tigra', 'Calibra', 'Kadett', 'Manta', 'Rocks-e'] },
  { name: 'Porsche', models: ['911 (993)', '911 (996)', '911 (997)', '911 (991)', '911 (992)', '911 Carrera', '911 Carrera S', '911 Carrera 4S', '911 Turbo', '911 Turbo S', '911 GT3', '911 GT3 RS', '911 GT2 RS', '911 Targa', '911 Dakar', '718 Boxster', '718 Boxster S', '718 Cayman', '718 Cayman S', '718 Cayman GT4', '718 Spyder', 'Cayenne', 'Cayenne S', 'Cayenne GTS', 'Cayenne Turbo', 'Cayenne E-Hybrid', 'Cayenne Coupé', 'Macan', 'Macan S', 'Macan GTS', 'Macan Turbo', 'Macan Electric', 'Panamera', 'Panamera S', 'Panamera GTS', 'Panamera Turbo', 'Panamera E-Hybrid', 'Panamera Sport Turismo', 'Taycan', 'Taycan 4S', 'Taycan Turbo', 'Taycan Turbo S', 'Taycan Cross Turismo', 'Taycan Sport Turismo', 'Boxster (986)', 'Boxster (987)', 'Cayman (987)', 'Cayman (981)'] },
  { name: 'Smart', models: ['Fortwo', 'Fortwo Coupé', 'Fortwo Cabrio', 'Fortwo Electric', 'Forfour', 'Forfour Electric', 'Roadster', 'Roadster Coupé', '#1', '#3'] },

  // ── ITALIAN ──
  { name: 'Fiat', models: ['500', '500 (312)', '500C', '500e', '500X', '500X (334)', '500L', '500L Living', '500L Trekking', '600e', 'Panda', 'Panda II', 'Panda III', 'Panda 4x4', 'Panda Cross', 'Tipo', 'Tipo Station Wagon', 'Tipo Cross', 'Punto', 'Punto Evo', 'Grande Punto', 'Punto II', 'Doblo', 'Doblo II', 'Doblo III', 'Ducato', 'Ducato II', 'Ducato III', 'Fiorino', 'Fiorino III', 'Talento', 'Scudo', 'Scudo II', 'Ulysse', 'Ulysse II', 'Multipla', 'Bravo', 'Bravo II', 'Stilo', 'Croma', 'Croma II', 'Sedici', 'Freemont', 'Qubo', '124 Spider', 'Barchetta', 'Coupe', 'Marea', 'Palio', 'Seicento', 'Idea', 'Linea', 'Fullback', 'Topolino'] },
  { name: 'Alfa Romeo', models: ['Giulia', 'Giulia Quadrifoglio', 'Stelvio', 'Stelvio Quadrifoglio', 'Tonale', 'Junior', 'Giulietta', 'MiTo', '4C', '4C Spider', '159', '159 Sportwagon', '156', '156 Sportwagon', '147', '147 GTA', 'GT', 'Brera', 'Spider (939)', '166', '155', '164', '145', '146', '33', '75', 'GTV', 'Crosswagon Q4', '8C Competizione'] },
  { name: 'Lancia', models: ['Ypsilon', 'Ypsilon (846)', 'Delta', 'Delta III', 'Musa', 'Phedra', 'Thesis', 'Lybra', 'Kappa', 'Dedra', 'Thema', 'Thema II', 'Voyager', 'Flavia', 'Stratos'] },
  { name: 'Maserati', models: ['Ghibli', 'Ghibli II', 'Levante', 'Quattroporte', 'Quattroporte V', 'Quattroporte VI', 'GranTurismo', 'GranTurismo (2023)', 'GranCabrio', 'GranCabrio (2024)', 'Grecale', 'MC20', 'MC20 Cielo', '3200 GT', 'Coupe', 'Spyder'] },
  { name: 'Ferrari', models: ['296 GTB', '296 GTS', 'SF90 Stradale', 'SF90 Spider', 'F8 Tributo', 'F8 Spider', 'Roma', 'Roma Spider', 'Portofino', 'Portofino M', '812 Superfast', '812 GTS', '812 Competizione', 'Purosangue', 'Daytona SP3', '488 GTB', '488 Spider', '488 Pista', 'GTC4Lusso', 'California', 'California T', '458 Italia', '458 Spider', 'F12berlinetta', 'LaFerrari', 'FF', '599 GTB', '612 Scaglietti', 'Enzo', 'F430', '360 Modena', '355', '348', 'F40', 'F50', 'Testarossa'] },
  { name: 'Lamborghini', models: ['Huracán', 'Huracán EVO', 'Huracán Tecnica', 'Huracán STO', 'Huracán Sterrato', 'Aventador', 'Aventador S', 'Aventador SVJ', 'Aventador Ultimae', 'Urus', 'Urus S', 'Urus Performante', 'Revuelto', 'Gallardo', 'Murciélago', 'Diablo', 'Countach LPI 800-4'] },

  // ── JAPANESE ──
  { name: 'Toyota', models: ['Yaris', 'Yaris II', 'Yaris III', 'Yaris IV', 'Yaris Cross', 'GR Yaris', 'Corolla', 'Corolla XII', 'Corolla Cross', 'Corolla Touring Sports', 'Corolla Verso', 'C-HR', 'C-HR II', 'RAV4', 'RAV4 II', 'RAV4 III', 'RAV4 IV', 'RAV4 V', 'Camry', 'Camry VIII', 'Prius', 'Prius II', 'Prius III', 'Prius IV', 'Prius V', 'Prius+', 'Aygo', 'Aygo II', 'Aygo X', 'Land Cruiser', 'Land Cruiser 150', 'Land Cruiser 300', 'Land Cruiser 80', 'Hilux', 'Hilux VIII', 'Proace', 'Proace II', 'Proace City', 'Proace Verso', 'Supra', 'Supra V', 'GR86', 'GT86', 'bZ4X', 'Highlander', 'Mirai', 'Mirai II', 'Avensis', 'Avensis II', 'Avensis III', 'Auris', 'Auris II', 'Verso', 'Verso-S', 'Celica', 'MR2', 'Previa', 'Sequoia', 'Tundra', 'Tacoma', '4Runner', 'FJ Cruiser', 'Urban Cruiser', 'IQ', 'Crown'] },
  { name: 'Honda', models: ['Civic', 'Civic VIII', 'Civic IX', 'Civic X', 'Civic XI', 'Civic Type R', 'Jazz', 'Jazz II', 'Jazz III', 'Jazz IV', 'HR-V', 'HR-V II', 'HR-V III', 'CR-V', 'CR-V II', 'CR-V III', 'CR-V IV', 'CR-V V', 'CR-V VI', 'ZR-V', 'e:Ny1', 'Honda e', 'Accord', 'Accord VII', 'Accord VIII', 'Accord IX', 'Accord X', 'FR-V', 'CR-Z', 'Insight', 'Insight II', 'Insight III', 'Legend', 'Legend IV', 'S2000', 'NSX', 'NSX II', 'City', 'Prelude', 'Integra', 'Stream', 'Element', 'Odyssey', 'Pilot', 'Ridgeline', 'Passport', 'Fit', 'Shuttle'] },
  { name: 'Nissan', models: ['Micra', 'Micra III', 'Micra IV', 'Micra V', 'Juke', 'Juke II', 'Qashqai', 'Qashqai II', 'Qashqai III', 'Qashqai+2', 'X-Trail', 'X-Trail II', 'X-Trail III', 'X-Trail IV', 'Leaf', 'Leaf II', 'Ariya', 'Note', 'Note II', 'Note III', 'Pulsar', 'Navara', 'Navara D40', 'Navara NP300', 'NV200', 'e-NV200', 'NV300', 'NV400', 'Primastar', 'Primastar II', 'Interstar', 'Interstar II', 'Pathfinder', 'Pathfinder III', 'Pathfinder IV', 'Patrol', 'Patrol Y61', 'Patrol Y62', '350Z', '370Z', 'GT-R', 'Murano', 'Murano II', 'Tiida', 'Almera', 'Almera Tino', 'Primera', 'Primera III', 'Maxima', 'Terrano', 'Terrano II', 'Pixo', 'Cube', 'Townstar', 'Townstar EV', 'Kicks', 'Sentra', 'Altima', 'Rogue', 'Frontier'] },
  { name: 'Mazda', models: ['Mazda2', 'Mazda2 (DJ)', 'Mazda3', 'Mazda3 (BL)', 'Mazda3 (BM)', 'Mazda3 (BP)', 'Mazda6', 'Mazda6 (GH)', 'Mazda6 (GJ)', 'CX-3', 'CX-30', 'CX-5', 'CX-5 (KF)', 'CX-60', 'CX-80', 'MX-5', 'MX-5 (NC)', 'MX-5 (ND)', 'MX-30', 'MX-30 R-EV', 'RX-8', 'RX-7', 'Mazda5', 'Mazda5 (CW)', 'Tribute', 'Premacy', 'MPV', 'BT-50', 'CX-7', 'CX-9', '323', '626', 'Xedos 6', 'Xedos 9', 'Demio'] },
  { name: 'Suzuki', models: ['Swift', 'Swift III', 'Swift IV', 'Swift V', 'Swift Sport', 'Vitara', 'Vitara (LY)', 'Grand Vitara', 'Grand Vitara II', 'Grand Vitara III', 'S-Cross', 'S-Cross II', 'SX4', 'SX4 S-Cross', 'Ignis', 'Ignis II', 'Jimny', 'Jimny III', 'Jimny IV', 'Across', 'Swace', 'Baleno', 'Baleno II', 'Celerio', 'Alto', 'Alto VII', 'Alto VIII', 'Splash', 'Liana', 'Wagon R', 'Wagon R+', 'Kizashi', 'Samurai', 'X-90', 'Cappuccino', 'Carry', 'Every', 'Hustler', 'Spacia'] },
  { name: 'Mitsubishi', models: ['ASX', 'ASX II', 'Eclipse Cross', 'Eclipse Cross II', 'Outlander', 'Outlander II', 'Outlander III', 'Outlander IV', 'Outlander PHEV', 'Space Star', 'Space Star II', 'L200', 'L200 V', 'L200 VI', 'Pajero', 'Pajero III', 'Pajero IV', 'Pajero Sport', 'Colt', 'Colt VII', 'Lancer', 'Lancer IX', 'Lancer X', 'Lancer Evolution', 'Galant', 'Galant IX', 'Carisma', 'Grandis', 'i-MiEV', '3000GT', 'Sigma', 'Space Wagon', 'Space Runner', 'Shogun', 'Triton', 'Delica', 'Mirage'] },
  { name: 'Subaru', models: ['Impreza', 'Impreza III', 'Impreza IV', 'Impreza V', 'XV', 'XV II', 'Crosstrek', 'Forester', 'Forester III', 'Forester IV', 'Forester V', 'Outback', 'Outback IV', 'Outback V', 'Outback VI', 'Levorg', 'Levorg II', 'BRZ', 'BRZ II', 'WRX', 'WRX STI', 'Legacy', 'Legacy V', 'Legacy VI', 'Tribeca', 'Justy', 'Trezia', 'Solterra', 'Ascent', 'Baja', 'SVX', 'Vivio', 'Sambar'] },
  { name: 'Lexus', models: ['CT 200h', 'IS', 'IS 200', 'IS 250', 'IS 300h', 'IS 350', 'IS F', 'ES', 'ES 300h', 'ES 350', 'GS', 'GS 300', 'GS 350', 'GS 450h', 'GS F', 'LS', 'LS 400', 'LS 430', 'LS 460', 'LS 500', 'LS 500h', 'UX', 'UX 200', 'UX 250h', 'UX 300e', 'NX', 'NX 200t', 'NX 250', 'NX 300h', 'NX 350h', 'NX 450h+', 'RX', 'RX 300', 'RX 350', 'RX 350h', 'RX 400h', 'RX 450h', 'RX 450h+', 'RX 500h', 'LX', 'LX 470', 'LX 570', 'LX 600', 'LC', 'LC 500', 'LC 500h', 'RC', 'RC 200t', 'RC 300h', 'RC F', 'RZ', 'RZ 450e', 'LBX', 'SC 430'] },
  { name: 'Infiniti', models: ['Q30', 'Q50', 'Q60', 'Q70', 'QX30', 'QX50', 'QX55', 'QX60', 'QX70', 'QX80', 'FX35', 'FX37', 'FX45', 'FX50', 'EX35', 'EX37', 'G35', 'G37', 'M35', 'M37', 'M45'] },
  { name: 'Isuzu', models: ['D-Max', 'D-Max II', 'D-Max III', 'MU-X', 'Trooper', 'Rodeo', 'Campo', 'Piazza', 'Gemini'] },
  { name: 'Daihatsu', models: ['Sirion', 'Terios', 'Materia', 'Copen', 'Cuore', 'YRV', 'Move', 'Charade', 'Feroza', 'Rocky', 'Taft', 'Hijet'] },

  // ── KOREAN ──
  { name: 'Hyundai', models: ['i10', 'i10 II', 'i10 III', 'i20', 'i20 II', 'i20 III', 'i20 N', 'i30', 'i30 II', 'i30 III', 'i30 N', 'i30 Fastback', 'i30 Wagon', 'i40', 'i40 Wagon', 'Tucson', 'Tucson II', 'Tucson III', 'Tucson IV', 'Kona', 'Kona II', 'Kona Electric', 'Kona N', 'Bayon', 'Santa Fe', 'Santa Fe III', 'Santa Fe IV', 'Santa Fe V', 'Ioniq', 'Ioniq 5', 'Ioniq 5 N', 'Ioniq 6', 'Nexo', 'ix20', 'ix35', 'Getz', 'Accent', 'Accent III', 'Atos', 'Atos Prime', 'Matrix', 'Terracan', 'Galloper', 'H-1', 'H-1 Travel', 'Staria', 'Veloster', 'Veloster N', 'Genesis Coupe', 'Sonata', 'Elantra', 'Palisade', 'Venue', 'Creta', 'Casper', 'Inster'] },
  { name: 'Kia', models: ['Picanto', 'Picanto II', 'Picanto III', 'Rio', 'Rio III', 'Rio IV', 'Ceed', 'Ceed II', 'Ceed III', 'Ceed SW', 'ProCeed', 'XCeed', 'Sportage', 'Sportage III', 'Sportage IV', 'Sportage V', 'Sorento', 'Sorento II', 'Sorento III', 'Sorento IV', 'Stonic', 'Niro', 'Niro II', 'e-Niro', 'EV6', 'EV6 GT', 'EV9', 'EV3', 'EV5', 'Stinger', 'Carnival', 'Carnival IV', 'Soul', 'Soul II', 'Soul EV', 'Venga', 'Optima', 'Optima II', 'Carens', 'Carens IV', 'Magentis', 'Cee\'d', 'Cee\'d SW', 'Cerato', 'Forte', 'K5', 'Telluride', 'Seltos'] },
  { name: 'Genesis', models: ['G70', 'G80', 'G90', 'GV60', 'GV70', 'GV80', 'X'] },
  { name: 'Ssangyong', models: ['Tivoli', 'Tivoli XLV', 'Korando', 'Korando IV', 'Korando V', 'Korando e-Motion', 'Rexton', 'Rexton III', 'Rexton IV', 'Musso', 'Musso Grand', 'Rodius', 'Turismo', 'Kyron', 'Actyon', 'Actyon Sports', 'Chairman', 'Torres', 'Torres EVX'] },

  // ── BRITISH ──
  { name: 'Land Rover', models: ['Range Rover', 'Range Rover (L322)', 'Range Rover (L405)', 'Range Rover (L460)', 'Range Rover Sport', 'Range Rover Sport (L320)', 'Range Rover Sport (L494)', 'Range Rover Sport (L461)', 'Range Rover Evoque', 'Range Rover Evoque (L538)', 'Range Rover Evoque (L551)', 'Range Rover Velar', 'Discovery', 'Discovery 3', 'Discovery 4', 'Discovery 5', 'Discovery Sport', 'Defender', 'Defender 90', 'Defender 110', 'Defender 130', 'Freelander', 'Freelander 2'] },
  { name: 'Jaguar', models: ['XE', 'XF', 'XF Sportbrake', 'XJ', 'XJ (X351)', 'XJ (X350)', 'XJ (X308)', 'F-Pace', 'F-Pace SVR', 'E-Pace', 'I-Pace', 'F-Type', 'F-Type Coupé', 'F-Type Cabriolet', 'F-Type SVR', 'X-Type', 'X-Type Estate', 'S-Type', 'XK', 'XK8', 'XKR'] },
  { name: 'Mini', models: ['Cooper', 'Cooper S', 'Cooper SE', 'Cooper (F55)', 'Cooper (F56)', 'Cooper (J01)', 'One', 'Countryman', 'Countryman (F60)', 'Countryman (U25)', 'Countryman SE', 'Clubman', 'Clubman (F54)', 'Cabrio', 'Cabrio (F57)', 'Paceman', 'Coupé', 'Roadster', 'John Cooper Works', 'JCW GP', 'Aceman', 'Cooper (R50)', 'Cooper (R53)', 'Cooper (R56)'] },
  { name: 'Bentley', models: ['Continental GT', 'Continental GT Speed', 'Continental GT Mulliner', 'Continental GTC', 'Flying Spur', 'Flying Spur Mulliner', 'Bentayga', 'Bentayga S', 'Bentayga EWB', 'Mulsanne', 'Arnage', 'Azure', 'Brooklands'] },
  { name: 'Rolls-Royce', models: ['Phantom', 'Phantom VIII', 'Ghost', 'Ghost II', 'Wraith', 'Dawn', 'Cullinan', 'Spectre', 'Silver Shadow', 'Silver Spirit', 'Silver Seraph', 'Corniche'] },
  { name: 'Aston Martin', models: ['DB11', 'DB11 Volante', 'DB12', 'DB12 Volante', 'DBS Superleggera', 'DBS Volante', 'Vantage', 'Vantage (2024)', 'Vantage Roadster', 'DBX', 'DBX707', 'Valkyrie', 'Vanquish', 'Rapide', 'Rapide S', 'V8 Vantage', 'V12 Vantage', 'DB9', 'DB7', 'Virage'] },
  { name: 'McLaren', models: ['720S', '720S Spider', '750S', '750S Spider', '765LT', '765LT Spider', 'Artura', 'GT', 'GTS', '570S', '570GT', '540C', '600LT', '620R', 'Senna', 'Speedtail', 'Elva', 'P1', 'MP4-12C', '650S'] },
  { name: 'Lotus', models: ['Eletre', 'Emeya', 'Emira', 'Evora', 'Evora GT', 'Exige', 'Elise', 'Europa', 'Esprit'] },
  { name: 'Morgan', models: ['Plus Four', 'Plus Six', 'Super 3', '3 Wheeler', 'Aero 8', 'Roadster'] },
  { name: 'Caterham', models: ['Seven 170', 'Seven 270', 'Seven 310', 'Seven 360', 'Seven 420', 'Seven 480', 'Seven 620'] },
  { name: 'MG', models: ['ZS', 'ZS EV', 'HS', 'HS PHEV', 'MG4', 'MG4 XPower', 'MG5', 'MG5 EV', 'Marvel R', 'EHS', 'Cyberster', 'MG3', 'MG3 Hybrid+', 'ZT', 'ZR', 'TF', 'F', 'MGF'] },

  // ── SWEDISH ──
  { name: 'Volvo', models: ['XC40', 'XC40 Recharge', 'C40 Recharge', 'EX30', 'EX40', 'EX90', 'XC60', 'XC60 II', 'XC90', 'XC90 II', 'XC70', 'S60', 'S60 II', 'S60 III', 'S90', 'S90 II', 'V40', 'V40 Cross Country', 'V60', 'V60 II', 'V60 Cross Country', 'V90', 'V90 Cross Country', 'S40', 'S40 II', 'S80', 'S80 II', 'V50', 'V70', 'V70 III', 'C30', 'C70', 'C70 II', '850', '940', '960', 'S70', 'V40 II'] },
  { name: 'Saab', models: ['9-3', '9-3 II', '9-3 Cabriolet', '9-3 SportCombi', '9-5', '9-5 II', '9-4X', '9-7X', '900', '900 II', '9000'] },
  { name: 'Polestar', models: ['Polestar 1', 'Polestar 2', 'Polestar 3', 'Polestar 4', 'Polestar 5', 'Polestar 6'] },

  // ── SPANISH ──
  { name: 'Seat', models: ['Ibiza', 'Ibiza IV', 'Ibiza V', 'Leon', 'Leon II', 'Leon III', 'Leon IV', 'Leon ST', 'Leon Sportstourer', 'Arona', 'Ateca', 'Tarraco', 'Alhambra', 'Alhambra II', 'Toledo', 'Toledo IV', 'Mii', 'Mii Electric', 'Altea', 'Altea XL', 'Exeo', 'Exeo ST', 'Cordoba', 'Cordoba II', 'Arosa', 'Inca'] },
  { name: 'Cupra', models: ['Formentor', 'Born', 'Leon', 'Leon Sportstourer', 'Ateca', 'Tavascan', 'Terramar', 'UrbanRebel'] },

  // ── CZECH ──
  { name: 'Škoda', models: ['Fabia', 'Fabia II', 'Fabia III', 'Fabia IV', 'Fabia Combi', 'Octavia', 'Octavia II', 'Octavia III', 'Octavia IV', 'Octavia Combi', 'Octavia RS', 'Superb', 'Superb II', 'Superb III', 'Superb Combi', 'Kamiq', 'Karoq', 'Kodiaq', 'Kodiaq II', 'Scala', 'Enyaq', 'Enyaq Coupé', 'Enyaq iV', 'Elroq', 'Citigo', 'Citigo-e iV', 'Rapid', 'Rapid Spaceback', 'Roomster', 'Yeti', 'Felicia', 'Favorit', 'Forman'] },

  // ── AMERICAN ──
  { name: 'Tesla', models: ['Model 3', 'Model 3 Highland', 'Model Y', 'Model Y Juniper', 'Model S', 'Model S Plaid', 'Model X', 'Model X Plaid', 'Cybertruck', 'Roadster', 'Roadster (2008)', 'Semi'] },
  { name: 'Ford', models: ['Fiesta', 'Fiesta VI', 'Fiesta VII', 'Fiesta ST', 'Focus', 'Focus II', 'Focus III', 'Focus IV', 'Focus ST', 'Focus RS', 'Puma', 'Puma II', 'Kuga', 'Kuga II', 'Kuga III', 'Mustang', 'Mustang VI', 'Mustang VII', 'Mustang Mach-E', 'Explorer', 'Explorer VI', 'Explorer Electric', 'Ranger', 'Ranger III', 'Ranger IV', 'Ranger Raptor', 'Transit', 'Transit VI', 'Transit VII', 'Transit Custom', 'Transit Custom II', 'Transit Connect', 'Transit Connect II', 'Transit Courier', 'Tourneo', 'Tourneo Connect', 'Tourneo Courier', 'Tourneo Custom', 'Mondeo', 'Mondeo III', 'Mondeo IV', 'Mondeo V', 'S-Max', 'S-Max II', 'Galaxy', 'Galaxy III', 'EcoSport', 'Edge', 'Edge II', 'Ka', 'Ka+', 'C-Max', 'C-Max II', 'Grand C-Max', 'B-Max', 'Fusion', 'Maverick', 'Bronco', 'Bronco Sport', 'F-150', 'F-150 Lightning', 'Raptor', 'Escape', 'Expedition', 'Excursion', 'Flex', 'Taurus', 'Cougar', 'Probe', 'Scorpio', 'Sierra', 'Capri', 'E-Transit', 'E-Tourneo Custom'] },
  { name: 'Chevrolet', models: ['Spark', 'Aveo', 'Cruze', 'Orlando', 'Trax', 'Captiva', 'Camaro', 'Camaro VI', 'Corvette', 'Corvette C7', 'Corvette C8', 'Corvette E-Ray', 'Matiz', 'Kalos', 'Lacetti', 'Epica', 'Malibu', 'Impala', 'Equinox', 'Equinox EV', 'Blazer', 'Blazer EV', 'Traverse', 'Tahoe', 'Suburban', 'Silverado', 'Silverado EV', 'Colorado', 'Bolt', 'Bolt EUV', 'Volt', 'Sonic', 'Trailblazer', 'HHR', 'SSR', 'Avalanche', 'Express', 'Astro', 'S10', 'Nubira', 'Rezzo', 'Tacuma', 'Evanda'] },
  { name: 'Dodge', models: ['Nitro', 'Caliber', 'Journey', 'Avenger', 'Challenger', 'Challenger SRT', 'Charger', 'Charger SRT', 'Durango', 'Durango SRT', 'Ram 1500', 'Ram 2500', 'Ram 3500', 'Viper', 'Hornet', 'Dart', 'Neon', 'Magnum', 'Grand Caravan', 'Dakota'] },
  { name: 'Chrysler', models: ['300', '300C', '300S', 'Voyager', 'Grand Voyager', 'Pacifica', 'Pacifica Hybrid', 'PT Cruiser', 'Sebring', 'Sebring Cabriolet', 'Crossfire', 'Neon', 'Stratus', 'Aspen', 'Town & Country'] },
  { name: 'Jeep', models: ['Renegade', 'Renegade 4xe', 'Compass', 'Compass 4xe', 'Cherokee', 'Cherokee (KL)', 'Grand Cherokee', 'Grand Cherokee (WK)', 'Grand Cherokee (WK2)', 'Grand Cherokee (WL)', 'Grand Cherokee L', 'Grand Cherokee 4xe', 'Wrangler', 'Wrangler (JK)', 'Wrangler (JL)', 'Wrangler 4xe', 'Gladiator', 'Avenger', 'Commander', 'Patriot', 'Liberty', 'Wagoneer', 'Grand Wagoneer'] },
  { name: 'Cadillac', models: ['CT4', 'CT5', 'CT6', 'Escalade', 'Escalade ESV', 'XT4', 'XT5', 'XT6', 'Lyriq', 'Celestiq', 'CTS', 'ATS', 'SRX', 'STS', 'XTS', 'BLS', 'Seville', 'DeVille', 'Eldorado'] },
  { name: 'Lincoln', models: ['Aviator', 'Corsair', 'Nautilus', 'Navigator', 'Continental', 'MKC', 'MKX', 'MKZ', 'MKS', 'MKT', 'Town Car'] },
  { name: 'GMC', models: ['Sierra', 'Sierra 1500', 'Sierra 2500', 'Canyon', 'Yukon', 'Yukon XL', 'Acadia', 'Terrain', 'Hummer EV', 'Savana', 'Envoy'] },
  { name: 'Buick', models: ['Enclave', 'Encore', 'Encore GX', 'Envision', 'LaCrosse', 'Regal', 'Verano'] },
  { name: 'Hummer', models: ['H1', 'H2', 'H3', 'H3T', 'EV Pickup', 'EV SUV'] },
  { name: 'Pontiac', models: ['Firebird', 'GTO', 'Grand Am', 'Grand Prix', 'Solstice', 'Vibe', 'G6', 'G8'] },
  { name: 'RAM', models: ['1500', '1500 Classic', '2500', '3500', 'ProMaster', 'ProMaster City', '1500 REV', '1500 TRX'] },

  // ── CHINESE ──
  { name: 'BYD', models: ['Atto 3', 'Dolphin', 'Seal', 'Seal U', 'Tang', 'Han', 'Song Plus', 'Yuan Plus', 'Qin Plus', 'Destroyer 05', 'Frigate 07', 'Sealion 6', 'Sealion 7'] },
  { name: 'NIO', models: ['ET5', 'ET5 Touring', 'ET7', 'EL6', 'EL7', 'EL8', 'ES6', 'ES7', 'ES8', 'EC6', 'EC7', 'EP9'] },
  { name: 'XPeng', models: ['G3', 'G6', 'G9', 'P5', 'P7', 'P7i', 'X9', 'Mona M03'] },
  { name: 'Aiways', models: ['U5', 'U6'] },
  { name: 'Lynk & Co', models: ['01', '02', '03', '05', '06', '09'] },
  { name: 'GWM', models: ['Ora 03', 'Ora 07', 'Wey Coffee 01', 'Wey Coffee 02'] },
  { name: 'Zeekr', models: ['001', '007', '009', 'X'] },
  { name: 'Leapmotor', models: ['T03', 'C10', 'C11', 'C16', 'S01'] },
  { name: 'Dongfeng', models: ['Box', 'Nammi 01', 'Voyah Free', 'Voyah Dream', 'Forthing T5 EVO', 'Forthing U-Tour'] },
  { name: 'Chery', models: ['Tiggo 4 Pro', 'Tiggo 7 Pro', 'Tiggo 8 Pro', 'Omoda 5', 'Omoda C5', 'Jaecoo 7'] },
  { name: 'Geely', models: ['Coolray', 'Azkarra', 'Monjaro', 'Emgrand', 'Preface', 'Geometry C', 'Galaxy L7', 'Galaxy E8'] },
  { name: 'SAIC', models: ['MG ZS', 'MG HS', 'MG4', 'MG5', 'Maxus Deliver 9', 'Maxus T90', 'Maxus Mifa 9'] },

  // ── INDIAN ──
  { name: 'Tata', models: ['Nexon', 'Nexon EV', 'Harrier', 'Safari', 'Punch', 'Punch EV', 'Tiago', 'Tiago EV', 'Tigor', 'Tigor EV', 'Altroz', 'Curvv', 'Curvv EV'] },
  { name: 'Mahindra', models: ['XUV700', 'XUV400', 'XUV300', 'Thar', 'Scorpio', 'Scorpio-N', 'Bolero', 'Bolero Neo', 'Marazzo', 'KUV100', 'XUV.e8', 'XUV.e9', 'BE.05'] },

  // ── OTHER ──
  { name: 'Bugatti', models: ['Chiron', 'Chiron Sport', 'Chiron Pur Sport', 'Chiron Super Sport', 'Divo', 'Centodieci', 'Bolide', 'Mistral', 'Tourbillon', 'Veyron', 'Veyron Grand Sport', 'EB110'] },
  { name: 'Pagani', models: ['Huayra', 'Huayra Roadster', 'Huayra R', 'Utopia', 'Zonda', 'Zonda F', 'Zonda Cinque'] },
  { name: 'Koenigsegg', models: ['Jesko', 'Jesko Absolut', 'Gemera', 'CC850', 'Regera', 'Agera', 'Agera RS', 'One:1', 'CCX', 'CCXR'] },
  { name: 'Rimac', models: ['Nevera', 'Concept One'] },
  { name: 'Rivian', models: ['R1T', 'R1S', 'R2', 'R3'] },
  { name: 'Lucid', models: ['Air', 'Air Pure', 'Air Touring', 'Air Grand Touring', 'Air Sapphire', 'Gravity'] },
  { name: 'Fisker', models: ['Ocean', 'Pear', 'Ronin', 'Alaska', 'Karma'] },
  { name: 'Vinfast', models: ['VF 6', 'VF 7', 'VF 8', 'VF 9', 'VF e34', 'VF 3', 'VF 5'] },
  { name: 'Wiesmann', models: ['GT MF4', 'GT MF5', 'Thunderball'] },
  { name: 'De Tomaso', models: ['P72', 'Mangusta', 'Pantera'] },
  { name: 'Lada', models: ['Niva', 'Niva Legend', 'Niva Travel', 'Vesta', 'Granta', 'Largus', 'XRAY', '4x4', 'Kalina', 'Priora', 'Samara', '2107', '2110'] },
  { name: 'Skoda', models: ['Fabia', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Scala', 'Enyaq', 'Elroq', 'Citigo', 'Rapid', 'Roomster', 'Yeti'] },
  { name: 'Ligier', models: ['JS50', 'JS60', 'Myli', 'JS RC', 'Pulse 4'] },
  { name: 'Microcar', models: ['M.Go', 'M.Go Plus', 'Dué', 'MGo 6', 'Highland X'] },
  { name: 'Aixam', models: ['City', 'Coupé', 'Crossline', 'Crossover', 'e-City', 'e-Coupé', 'e-Crossover', 'Pro D-Truck', 'Pro e-Truck'] },
  { name: 'Chatenet', models: ['CH46', 'CH40', 'CH32', 'CH30', 'CH26', 'Sporteevo'] },
  { name: 'Piaggio', models: ['Ape', 'Porter'] },
  { name: 'Polaris', models: ['Slingshot', 'Ranger', 'RZR', 'General'] },
  { name: 'Can-Am', models: ['Spyder', 'Ryker', 'Maverick', 'Defender', 'Commander', 'Outlander'] },

  // ── TRUCKS / UTILITY ──
  { name: 'Iveco', models: ['Daily', 'Daily III', 'Daily IV', 'Daily V', 'Daily VI', 'Daily VII', 'eDaily', 'Eurocargo', 'Stralis', 'S-Way', 'X-Way', 'T-Way', 'Massif'] },
  { name: 'MAN', models: ['TGE', 'TGX', 'TGS', 'TGM', 'TGL'] },
  { name: 'Renault Trucks', models: ['Master', 'Trafic', 'Maxity', 'Midlum', 'Premium', 'Magnum', 'Kerax', 'T', 'C', 'K', 'D', 'D Wide'] },
  { name: 'Mercedes Trucks', models: ['Sprinter', 'Vito', 'Citan', 'Atego', 'Actros', 'Arocs', 'Econic', 'Unimog', 'eActros', 'eVito', 'eSprinter', 'eCitan'] },

  // ── CATCH-ALL AUTO ──
  { name: 'Autre', models: ['Autre modèle'] },
];

// ══════════════════════════════════════════════════════════════
// MOTORCYCLE (MOTO) MARQUES & MODELS
// ══════════════════════════════════════════════════════════════
export const motoMarques: VehicleMarque[] = [
  // ── JAPANESE ──
  { name: 'Honda', models: ['CBR 125R', 'CBR 250R', 'CBR 300R', 'CBR 500R', 'CBR 600RR', 'CBR 650R', 'CBR 1000RR', 'CBR 1000RR-R Fireblade', 'CB 125R', 'CB 300R', 'CB 500F', 'CB 500X', 'CB 650R', 'CB 750 Hornet', 'CB 1000R', 'CB 1300', 'Africa Twin CRF1100L', 'Africa Twin CRF1000L', 'X-ADV', 'ADV 350', 'NC 750X', 'NC 750S', 'NT1100', 'Transalp XL750', 'Forza 125', 'Forza 300', 'Forza 350', 'Forza 750', 'PCX 125', 'SH 125', 'SH 150', 'SH 300', 'SH 350', 'Vision 110', 'MSX 125 Grom', 'Monkey 125', 'Dax 125', 'Super Cub 125', 'CRF 250L', 'CRF 300L', 'CRF 300 Rally', 'CRF 450R', 'CRF 450RX', 'Gold Wing', 'Gold Wing Tour', 'Rebel 125', 'Rebel 300', 'Rebel 500', 'Rebel 1100', 'CMX 500', 'Shadow 750', 'VFR 800', 'VFR 1200', 'Integra', 'Deauville', 'Varadero', 'Hornet 600', 'Hornet 900'] },
  { name: 'Yamaha', models: ['YZF-R1', 'YZF-R1M', 'YZF-R6', 'YZF-R7', 'YZF-R3', 'YZF-R125', 'MT-03', 'MT-07', 'MT-09', 'MT-09 SP', 'MT-10', 'MT-10 SP', 'MT-125', 'XSR 125', 'XSR 700', 'XSR 900', 'Tracer 7', 'Tracer 9', 'Tracer 9 GT', 'Ténéré 700', 'Ténéré 700 Rally', 'Ténéré 700 World Raid', 'NIKEN', 'NIKEN GT', 'FJR 1300', 'TMAX 560', 'TMAX Tech Max', 'XMAX 125', 'XMAX 300', 'NMAX 125', 'Tricity 125', 'Tricity 300', 'D\'elight 125', 'Aerox 50', 'YZ 125', 'YZ 250', 'YZ 250F', 'YZ 450F', 'WR 250F', 'WR 450F', 'WR 125R', 'WR 125X', 'XT 660', 'XV 950', 'XVS 650', 'XVS 950', 'XVS 1300', 'V-Max', 'Bolt', 'Drag Star', 'FZ6', 'FZ8', 'FZ1', 'Fazer 600', 'Fazer 800', 'Fazer 1000', 'TDM 900', 'BW\'s 125'] },
  { name: 'Kawasaki', models: ['Ninja ZX-6R', 'Ninja ZX-10R', 'Ninja ZX-10RR', 'Ninja ZX-4R', 'Ninja ZX-4RR', 'Ninja 125', 'Ninja 250', 'Ninja 300', 'Ninja 400', 'Ninja 650', 'Ninja 1000SX', 'Ninja H2', 'Ninja H2 SX', 'Ninja H2R', 'Z125', 'Z250', 'Z400', 'Z650', 'Z650RS', 'Z900', 'Z900RS', 'Z900RS Café', 'Z H2', 'Z H2 SE', 'Versys 650', 'Versys 1000', 'Versys-X 300', 'Vulcan S', 'Vulcan 900', 'W800', 'W800 Café', 'W800 Street', 'Eliminator', 'KLX 125', 'KLX 230', 'KLX 300', 'KX 250', 'KX 450', 'KLR 650', 'Concours 14', 'ER-6n', 'ER-6f', 'J125', 'J300'] },
  { name: 'Suzuki', models: ['GSX-R 125', 'GSX-R 250', 'GSX-R 600', 'GSX-R 750', 'GSX-R 1000', 'GSX-R 1000R', 'GSX-S 125', 'GSX-S 750', 'GSX-S 950', 'GSX-S 1000', 'GSX-S 1000GT', 'GSX-8S', 'GSX-8R', 'Hayabusa', 'V-Strom 250', 'V-Strom 650', 'V-Strom 800', 'V-Strom 800DE', 'V-Strom 1050', 'V-Strom 1050DE', 'SV 650', 'SV 650X', 'Katana', 'Burgman 125', 'Burgman 200', 'Burgman 400', 'Burgman 650', 'Address 125', 'Avenis 125', 'DR-Z 400', 'DR 650', 'RM-Z 250', 'RM-Z 450', 'Boulevard M109R', 'Boulevard C50', 'Intruder', 'Bandit 600', 'Bandit 650', 'Bandit 1200', 'Bandit 1250', 'Gladius', 'Inazuma', 'GSF 650', 'DL 650'] },

  // ── EUROPEAN ──
  { name: 'BMW Motorrad', models: ['R 1300 GS', 'R 1300 GS Adventure', 'R 1250 GS', 'R 1250 GS Adventure', 'R 1250 RT', 'R 1250 RS', 'R 1250 R', 'R NineT', 'R NineT Pure', 'R NineT Scrambler', 'R NineT Urban G/S', 'R 18', 'R 18 Classic', 'R 18 Transcontinental', 'R 18 Roctane', 'S 1000 RR', 'S 1000 R', 'S 1000 XR', 'M 1000 RR', 'M 1000 R', 'M 1000 XR', 'F 900 R', 'F 900 XR', 'F 900 GS', 'F 900 GS Adventure', 'F 850 GS', 'F 850 GS Adventure', 'F 750 GS', 'G 310 R', 'G 310 GS', 'G 650 GS', 'K 1600 GT', 'K 1600 GTL', 'K 1600 B', 'K 1600 Grand America', 'CE 04', 'CE 02', 'C 400 X', 'C 400 GT', 'C 650 Sport', 'C 650 GT', 'F 800 R', 'F 800 GS', 'F 800 GT', 'F 800 ST', 'HP4', 'R 1200 GS', 'R 1200 RT', 'R 1200 R', 'R 1200 RS'] },
  { name: 'Ducati', models: ['Panigale V4', 'Panigale V4 S', 'Panigale V4 R', 'Panigale V4 SP2', 'Panigale V2', 'Streetfighter V4', 'Streetfighter V4 S', 'Streetfighter V4 SP', 'Streetfighter V2', 'Monster', 'Monster SP', 'Monster +', 'Monster 821', 'Monster 1200', 'Monster 1200 S', 'Multistrada V4', 'Multistrada V4 S', 'Multistrada V4 Rally', 'Multistrada V4 Pikes Peak', 'Multistrada V2', 'Multistrada V2 S', 'Multistrada 1260', 'Multistrada 1200', 'Multistrada 950', 'Diavel V4', 'Diavel 1260', 'XDiavel', 'Hypermotard 950', 'Hypermotard 950 SP', 'Hypermotard 698 Mono', 'Scrambler Icon', 'Scrambler Full Throttle', 'Scrambler Nightshift', 'Scrambler Desert Sled', 'Scrambler 1100', 'Scrambler 800', 'DesertX', 'DesertX Rally', 'SuperSport 950', 'SuperSport 950 S', '848', '899', '959', '1098', '1199', '1299', 'Hyperstrada', 'GT 1000'] },
  { name: 'KTM', models: ['125 Duke', '200 Duke', '250 Duke', '390 Duke', '690 Duke', '790 Duke', '890 Duke', '890 Duke R', '1290 Super Duke R', '1290 Super Duke RR', '1290 Super Duke GT', '1390 Super Duke R', 'RC 125', 'RC 200', 'RC 390', 'RC 8C', '390 Adventure', '790 Adventure', '790 Adventure R', '890 Adventure', '890 Adventure R', '1290 Super Adventure S', '1290 Super Adventure R', '1390 Super Adventure S', '125 SX', '150 SX', '250 SX', '250 SX-F', '350 SX-F', '450 SX-F', '250 EXC', '300 EXC', '350 EXC-F', '450 EXC-F', '500 EXC-F', '690 Enduro R', '690 SMC R', 'Freeride 250F', 'Freeride E-XC', 'Freeride E-SM'] },
  { name: 'Aprilia', models: ['RSV4', 'RSV4 Factory', 'RSV4 1100', 'RS 660', 'RS 457', 'RS 125', 'Tuono V4', 'Tuono V4 Factory', 'Tuono 660', 'Tuono 660 Factory', 'Tuareg 660', 'Tuareg 660 Rally', 'Shiver 900', 'Dorsoduro 900', 'Dorsoduro 750', 'Mana 850', 'Caponord 1200', 'SR GT 125', 'SR GT 200', 'SR Max 300', 'SXR 125', 'SXR 160', 'Scarabeo 125', 'Scarabeo 200', 'Scarabeo 300', 'Atlantic 300', 'Pegaso 650', 'ETV 1000 Caponord', 'RSV 1000', 'Falco', 'Futura'] },
  { name: 'Moto Guzzi', models: ['V100 Mandello', 'V100 Mandello S', 'V85 TT', 'V85 TT Travel', 'V7', 'V7 Stone', 'V7 Special', 'V7 III', 'V9 Bobber', 'V9 Roamer', 'Stelvio', 'Griso 1200', 'Breva 750', 'Breva 1100', 'Norge 1200', 'California 1400', 'Audace', 'Eldorado', 'MGX-21'] },
  { name: 'MV Agusta', models: ['F3 675', 'F3 800', 'F3 Rosso', 'Brutale 675', 'Brutale 800', 'Brutale 800 RR', 'Brutale 1000 RR', 'Brutale 1000 RS', 'Dragster 800', 'Dragster 800 RR', 'Turismo Veloce 800', 'Turismo Veloce Lusso', 'Superveloce', 'Superveloce S', 'Rush 1000', 'Rivale 800', 'Stradale 800', 'Lucky Explorer 5.5', 'Lucky Explorer 9.5', 'Enduro Veloce'] },
  { name: 'Triumph', models: ['Street Triple 660', 'Street Triple 765 R', 'Street Triple 765 RS', 'Speed Triple 1200 RS', 'Speed Triple 1200 RR', 'Tiger 660 Sport', 'Tiger 850 Sport', 'Tiger 900', 'Tiger 900 Rally', 'Tiger 900 GT', 'Tiger 1200', 'Tiger 1200 Rally', 'Tiger 1200 GT', 'Trident 660', 'Speed 400', 'Scrambler 400 X', 'Scrambler 900', 'Scrambler 1200', 'Bonneville T100', 'Bonneville T120', 'Bonneville Bobber', 'Bonneville Speedmaster', 'Thruxton RS', 'Speed Twin 900', 'Speed Twin 1200', 'Rocket 3', 'Rocket 3 R', 'Rocket 3 GT', 'Daytona 660', 'Daytona 675', 'Sprint GT', 'Sprint ST', 'Trophy', 'Explorer 1200', 'Street Scrambler', 'Street Cup', 'Street Twin'] },
  { name: 'Husqvarna', models: ['Svartpilen 125', 'Svartpilen 401', 'Svartpilen 701', 'Vitpilen 125', 'Vitpilen 401', 'Vitpilen 701', 'Norden 901', 'Norden 901 Expedition', '701 Enduro', '701 Supermoto', 'FE 250', 'FE 350', 'FE 450', 'FE 501', 'TE 150i', 'TE 250i', 'TE 300i', 'FC 250', 'FC 350', 'FC 450', 'TX 300i', 'FX 350', 'FX 450', 'EE 5'] },
  { name: 'Piaggio', models: ['Beverly 300', 'Beverly 400', 'MP3 300', 'MP3 400', 'MP3 530', 'Medley 125', 'Medley 150', 'Liberty 125', 'Liberty 150', 'Fly 125', 'Zip 50', 'Zip 125', 'NRG 50', 'Typhoon 50', 'Typhoon 125', 'X10 350', 'X10 500'] },
  { name: 'Vespa', models: ['Primavera 50', 'Primavera 125', 'Primavera 150', 'Sprint 50', 'Sprint 125', 'Sprint 150', 'GTS 125', 'GTS 300', 'GTS Super 300', 'GTS Super Tech 300', 'GTV 300', 'Sei Giorni 300', 'Elettrica'] },
  { name: 'Benelli', models: ['TRK 502', 'TRK 502 X', 'TRK 702', 'TRK 702 X', 'TRK 800', 'Leoncino 125', 'Leoncino 250', 'Leoncino 500', 'Leoncino 800', '502C', '752S', 'BN 125', 'BN 251', 'BN 302', 'TNT 125', 'TNT 135', 'TNT 300', 'TNT 600', 'Imperiale 400'] },
  { name: 'Peugeot Motocycles', models: ['Metropolis 400', 'Pulsion 125', 'Django 50', 'Django 125', 'Django 150', 'Tweet 125', 'Tweet 150', 'Belville 125', 'Belville 200', 'Speedfight 50', 'Speedfight 125', 'Kisbee 50', 'Kisbee 100', 'Streetzone 50', 'Vivacity 50', 'Vivacity 125', 'Citystar 125', 'Citystar 200', 'Satelis 125', 'XP 400', 'XP 200'] },
  { name: 'SYM', models: ['Maxsym TL 508', 'Maxsym 400', 'Cruisym 125', 'Cruisym 300', 'Joymax Z 125', 'Joymax Z 300', 'HD 300', 'Symphony 125', 'Symphony 150', 'Fiddle 125', 'Orbit 50', 'Orbit 125', 'Jet 14 125', 'NH-T 125', 'NH-X 125'] },
  { name: 'Kymco', models: ['AK 550', 'Downtown 125', 'Downtown 350', 'X-Town 125', 'X-Town 300', 'People S 125', 'People S 150', 'People S 200', 'Agility 50', 'Agility 125', 'Agility City 125', 'Like 125', 'Like 200', 'New Like 125', 'Super Dink 125', 'Super Dink 350', 'Xciting S 400', 'DTX 125', 'DTX 360', 'CV2', 'CV3'] },

  // ── AMERICAN MOTO ──
  { name: 'Harley-Davidson', models: ['Street Glide', 'Street Glide ST', 'Street Glide Special', 'Road Glide', 'Road Glide ST', 'Road Glide Special', 'Road Glide Limited', 'Road King', 'Road King Special', 'Ultra Limited', 'CVO Street Glide', 'CVO Road Glide', 'Electra Glide', 'Heritage Classic', 'Fat Boy', 'Fat Boy 114', 'Breakout', 'Breakout 117', 'Fat Bob', 'Fat Bob 114', 'Low Rider', 'Low Rider S', 'Low Rider ST', 'Low Rider El Diablo', 'Sport Glide', 'Softail Standard', 'Softail Slim', 'Street Bob', 'Street Bob 114', 'Nightster', 'Nightster Special', 'Sportster S', 'Sportster 883', 'Sportster 1200', 'Iron 883', 'Forty-Eight', 'Pan America 1250', 'Pan America 1250 Special', 'LiveWire', 'X350', 'X500', 'Nightrod', 'V-Rod', 'Dyna', 'Wide Glide', 'Tri Glide', 'Freewheeler'] },
  { name: 'Indian', models: ['Scout', 'Scout Bobber', 'Scout Bobber Twenty', 'Scout Rogue', 'Scout Sport', 'Super Scout', 'Sport Chief', 'Chief', 'Chief Dark Horse', 'Chief Bobber', 'Chief Bobber Dark Horse', 'Super Chief', 'Super Chief Limited', 'Chieftain', 'Chieftain Dark Horse', 'Chieftain Limited', 'Roadmaster', 'Roadmaster Dark Horse', 'Roadmaster Limited', 'Challenger', 'Challenger Dark Horse', 'Challenger Limited', 'Pursuit', 'Pursuit Dark Horse', 'Pursuit Limited', 'Springfield', 'Springfield Dark Horse', 'FTR 1200', 'FTR 1200 S', 'FTR Rally', 'FTR R Carbon', 'Scout Sixty'] },
  { name: 'Buell', models: ['Hammerhead 1190RX', 'Super Cruiser', '1190SX', '1190RX', 'XB12', 'XB9', 'Blast', 'Lightning', 'Firebolt', 'Ulysses'] },

  // ── CHINESE / OTHER MOTO ──
  { name: 'CF Moto', models: ['700 CL-X Heritage', '700 CL-X Sport', '700 CL-X Adventure', '800 MT', '800 MT Touring', '800 NK', '450 NK', '450 SR', '450 MT', '300 NK', '300 SR', '300 CL-X', '250 NK', '250 SR', '150 NK', '650 NK', '650 MT', '650 GT', 'Papio 125', 'Zeechi'] },
  { name: 'Royal Enfield', models: ['Continental GT 650', 'INT 650', 'Super Meteor 650', 'Shotgun 650', 'Classic 350', 'Meteor 350', 'Hunter 350', 'Bullet 350', 'Himalayan', 'Himalayan 450', 'Scram 411', 'Guerrilla 450'] },
  { name: 'Brixton', models: ['Cromwell 1200', 'Cromwell 250', 'Crossfire 500', 'Crossfire 500 XC', 'Rayburn 125', 'Felsberg 125', 'Felsberg 250', 'Sunray 125', 'Glanville 250'] },
  { name: 'Fantic', models: ['Caballero 125', 'Caballero 250', 'Caballero 500', 'Caballero Rally 500', 'Caballero Scrambler 500', 'XEF 125', 'XEF 250', 'XE 125', 'XMF 250'] },
  { name: 'Voge', models: ['300 R', '300 RR', '300 DS', '500 R', '500 DS', '525 R', '525 DSX', '650 DS', '900 DSX'] },
  { name: 'Zontes', models: ['310 T', '310 V', '310 X', '310 R', '350 T', '350 D', '350 R', '350 GK'] },
  { name: 'Rieju', models: ['RS3 125', 'Tango 125', 'Century 125', 'MRT 50', 'MRT 125', 'Marathon 125', 'Nuuk'] },
  { name: 'Beta', models: ['RR 125', 'RR 200', 'RR 250', 'RR 300', 'RR 350', 'RR 390', 'RR 430', 'RR 480', 'RR 525', 'Xtrainer 250', 'Xtrainer 300', 'Alp 4.0', 'Urban 125', 'Urban 200'] },
  { name: 'GasGas', models: ['MC 125', 'MC 250', 'MC 250F', 'MC 350F', 'MC 450F', 'EC 250', 'EC 300', 'EC 250F', 'EC 350F', 'EX 250', 'EX 300', 'EX 250F', 'EX 350F', 'SM 700', 'ES 700'] },
  { name: 'Sherco', models: ['125 SE Factory', '250 SE Factory', '300 SE Factory', '250 SEF Factory', '300 SEF Factory', '450 SEF Factory', '500 SEF Factory', '125 SM-R', '125 City', 'X-Ride 125'] },
  { name: 'TM Racing', models: ['EN 125', 'EN 250', 'EN 300', 'EN 250Fi', 'EN 300Fi', 'EN 450Fi', 'MX 125', 'MX 250', 'MX 250Fi', 'MX 450Fi', 'SMR 125', 'SMR 450Fi', 'SMR 530Fi'] },
  { name: 'Zero Motorcycles', models: ['SR/F', 'SR/S', 'SR', 'S', 'DS', 'DSR', 'DSR/X', 'FX', 'FXE', 'FXS'] },
  { name: 'Energica', models: ['Ego', 'Ego+', 'Eva Ribelle', 'Eva EsseEsse9', 'Experia'] },
  { name: 'LiveWire', models: ['ONE', 'S2 Del Mar', 'S2 Mulholland'] },
  { name: 'Sur-Ron', models: ['Light Bee X', 'Light Bee S', 'Storm Bee', 'Ultra Bee'] },

  // ── CATCH-ALL MOTO ──
  { name: 'Autre Moto', models: ['Autre modèle'] },
];

/** Get sorted marque names for a vehicle type */
export function getMarqueNames(type: 'auto' | 'moto' = 'auto'): string[] {
  const list = type === 'moto' ? motoMarques : vehicleMarques;
  const catchAll = type === 'moto' ? 'Autre Moto' : 'Autre';
  return list
    .filter(m => m.name !== catchAll)
    .map(m => m.name)
    .sort((a, b) => a.localeCompare(b, 'fr'))
    .concat([catchAll]);
}

/** Get models for a given marque (searches both auto and moto) */
export function getModelsForMarque(marqueName: string, type: 'auto' | 'moto' = 'auto'): string[] {
  const list = type === 'moto' ? motoMarques : vehicleMarques;
  const marque = list.find(
    m => m.name.toLowerCase() === marqueName.toLowerCase()
  );
  if (!marque) return [];
  return [...marque.models].sort((a, b) => a.localeCompare(b, 'fr'));
}

/** Generate year options from current year down to 1970 */
export function getYearOptions(): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let y = currentYear + 1; y >= 1970; y--) {
    years.push(y.toString());
  }
  return years;
}
