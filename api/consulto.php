<?php
    $conn = new mysqli('localhost','root', '', 'id17412788_teleconsulto_db_2');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if (isset($_GET['oggetto'])) { 
 
            $oggetto = $conn->real_escape_string($_GET['oggetto']);

            $sql1 = $conn->query("SELECT consulto.id AS id_consulto, oggetto, data_inizio, paziente.nome AS paziente_nome, paziente.cognome AS paziente_cognome, 
            paziente.codice_fiscale AS paziente_cf, paziente.gender AS paziente_gender, paziente.data_nascita AS paziente_dataNascita 
            FROM consulto, partecipanti, paziente, medico WHERE oggetto LIKE '%$oggetto%' AND consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente
            AND medico.id = partecipanti.id_medico GROUP BY consulto.id ORDER BY paziente.cognome, paziente.nome");

            $num_results = mysqli_num_rows($sql1);

            $data = array('risultati' => $num_results);

            while ($d1 = $sql1->fetch_assoc()) {
                $row_array = array();
                $row_array['id_consulto'] = $d1['id_consulto'];     
                $row_array['oggetto'] = $d1['oggetto'];     
                $row_array['data_inizio'] = $d1['data_inizio'];
                $row_array['paziente_nome'] = $d1['paziente_nome'];
                $row_array['paziente_cognome'] = $d1['paziente_cognome'];
                $row_array['paziente_cf'] = $d1['paziente_cf'];    
                $row_array['paziente_nascita'] = $d1['paziente_dataNascita'];           
                $row_array['paziente_gender'] = $d1['paziente_gender'];      
                $row_array['medici'] = array();      

                $consulto_id = $d1['id_consulto'];  

                $sql2 = $conn->query("SELECT medico.email AS medico_email, medico.cognome AS medico_cognome, medico.nome AS medico_nome, 
                medico.codice_fiscale AS medico_cf, medico.professione AS medico_professione, richiedente FROM consulto, partecipanti, paziente, medico 
                WHERE consulto.id = '$consulto_id' AND consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico");

                while ($d2 = $sql2->fetch_assoc()) {
                    $row_array['medici'][] = array(
                        'medico_nome' => $d2['medico_nome'],
                        'medico_cognome' => $d2['medico_cognome'],
                        'medico_cf' => $d2['medico_cf'],
                        'medico_professione' => $d2['medico_professione'],
                        'medico_email' => $d2['medico_email'],
                        'richiedente' => $d2['richiedente']

                    );
                }

                array_push($data, $row_array);

            }

        } else if (isset($_GET['paziente_cognome'])) {

            $paziente_cognome = $conn->real_escape_string($_GET['paziente_cognome']);

            $sql1 = $conn->query("SELECT consulto.id AS id_consulto, oggetto, data_inizio, paziente.nome AS paziente_nome, paziente.cognome AS paziente_cognome, 
            paziente.codice_fiscale AS paziente_cf, paziente.gender AS paziente_gender, paziente.data_nascita AS paziente_dataNascita 
            FROM consulto, partecipanti, paziente, medico WHERE paziente.cognome LIKE '%$paziente_cognome%' AND consulto.id = partecipanti.id_consulto 
            AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico GROUP BY consulto.id ORDER BY paziente.cognome, paziente.nome");

            $num_results = mysqli_num_rows($sql1);

            $data = array('risultati' => $num_results);

            while ($d1 = $sql1->fetch_assoc()) {
                $row_array = array();
                $row_array['id_consulto'] = $d1['id_consulto'];     
                $row_array['oggetto'] = $d1['oggetto'];     
                $row_array['data_inizio'] = $d1['data_inizio'];
                $row_array['paziente_nome'] = $d1['paziente_nome'];
                $row_array['paziente_cognome'] = $d1['paziente_cognome'];
                $row_array['paziente_cf'] = $d1['paziente_cf'];    
                $row_array['paziente_nascita'] = $d1['paziente_dataNascita'];           
                $row_array['paziente_gender'] = $d1['paziente_gender'];      
                $row_array['medici'] = array();      

                $consulto_id = $d1['id_consulto'];  

                $sql2 = $conn->query("SELECT medico.email AS medico_email, medico.cognome AS medico_cognome, medico.nome AS medico_nome, 
                medico.codice_fiscale AS medico_cf, medico.professione AS medico_professione, richiedente FROM consulto, partecipanti, paziente, medico 
                WHERE consulto.id = '$consulto_id' AND consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico");

                while ($d2 = $sql2->fetch_assoc()) {
                    $row_array['medici'][] = array(
                        'medico_nome' => $d2['medico_nome'],
                        'medico_cognome' => $d2['medico_cognome'],
                        'medico_cf' => $d2['medico_cf'],
                        'medico_professione' => $d2['medico_professione'],
                        'medico_email' => $d2['medico_email'],
                        'richiedente' => $d2['richiedente']
                    );
                }

                array_push($data, $row_array);

            }

        } else if (isset($_GET['paziente_cf'])) {

            $paziente_cf = $conn->real_escape_string($_GET['paziente_cf']);

            $sql1 = $conn->query("SELECT consulto.id AS id_consulto, oggetto, data_inizio, paziente.nome AS paziente_nome, paziente.cognome AS paziente_cognome, 
            paziente.codice_fiscale AS paziente_cf, paziente.gender AS paziente_gender, paziente.data_nascita AS paziente_dataNascita 
            FROM consulto, partecipanti, paziente, medico WHERE paziente_cf = '$paziente_cf' AND consulto.id = partecipanti.id_consulto 
            AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico GROUP BY consulto.id ORDER BY paziente.cognome, paziente.nome");

            $num_results = mysqli_num_rows($sql1);

            $data = array('risultati' => $num_results);

            while ($d1 = $sql1->fetch_assoc()) {
                $row_array = array();
                $row_array['id_consulto'] = $d1['id_consulto'];     
                $row_array['oggetto'] = $d1['oggetto'];     
                $row_array['data_inizio'] = $d1['data_inizio'];
                $row_array['paziente_nome'] = $d1['paziente_nome'];
                $row_array['paziente_cognome'] = $d1['paziente_cognome'];
                $row_array['paziente_cf'] = $d1['paziente_cf'];    
                $row_array['paziente_nascita'] = $d1['paziente_dataNascita'];           
                $row_array['paziente_gender'] = $d1['paziente_gender'];      
                $row_array['medici'] = array();      

                $consulto_id = $d1['id_consulto'];  

                $sql2 = $conn->query("SELECT medico.email AS medico_email, medico.cognome AS medico_cognome, medico.nome AS medico_nome, 
                medico.codice_fiscale AS medico_cf, medico.professione AS medico_professione, richiedente FROM consulto, partecipanti, paziente, medico 
                WHERE consulto.id = '$consulto_id' AND consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico");

                while ($d2 = $sql2->fetch_assoc()) {
                    $row_array['medici'][] = array(
                        'medico_nome' => $d2['medico_nome'],
                        'medico_cognome' => $d2['medico_cognome'],
                        'medico_cf' => $d2['medico_cf'],
                        'medico_professione' => $d2['medico_professione'],
                        'medico_email' => $d2['medico_email'],
                        'richiedente' => $d2['richiedente']
                    );
                }

                array_push($data, $row_array);

            }

        } else if (isset($_GET['medico_cognome'])) {

            $medico_cognome = $conn->real_escape_string($_GET['medico_cognome']);

            $sql1 = $conn->query("SELECT consulto.id AS id_consulto, oggetto, data_inizio, paziente.nome AS paziente_nome, paziente.cognome AS paziente_cognome, 
            paziente.codice_fiscale AS paziente_cf, paziente.gender AS paziente_gender, paziente.data_nascita AS paziente_dataNascita 
            FROM consulto, partecipanti, paziente, medico WHERE consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente
            AND medico.id = partecipanti.id_medico AND medico.cognome LIKE '%$medico_cognome%' GROUP BY consulto.id ORDER BY paziente.cognome, paziente.nome");

            $num_results = mysqli_num_rows($sql1);

            $data = array('risultati' => $num_results);

            while ($d1 = $sql1->fetch_assoc()) {
                $row_array = array();
                $row_array['id_consulto'] = $d1['id_consulto'];     
                $row_array['oggetto'] = $d1['oggetto'];     
                $row_array['data_inizio'] = $d1['data_inizio'];
                $row_array['paziente_nome'] = $d1['paziente_nome'];
                $row_array['paziente_cognome'] = $d1['paziente_cognome'];
                $row_array['paziente_cf'] = $d1['paziente_cf'];    
                $row_array['paziente_nascita'] = $d1['paziente_dataNascita'];           
                $row_array['paziente_gender'] = $d1['paziente_gender'];      
                $row_array['medici'] = array();      

                $consulto_id = $d1['id_consulto'];  

                $sql2 = $conn->query("SELECT medico.email AS medico_email, medico.cognome AS medico_cognome, medico.nome AS medico_nome, 
                medico.codice_fiscale AS medico_cf, medico.professione AS medico_professione, richiedente FROM consulto, partecipanti, paziente, medico 
                WHERE consulto.id = '$consulto_id' AND consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico");

                while ($d2 = $sql2->fetch_assoc()) {
                    $row_array['medici'][] = array(
                        'medico_nome' => $d2['medico_nome'],
                        'medico_cognome' => $d2['medico_cognome'],
                        'medico_cf' => $d2['medico_cf'],
                        'medico_professione' => $d2['medico_professione'],
                        'medico_email' => $d2['medico_email'],
                        'richiedente' => $d2['richiedente']
                    );
                }

                array_push($data, $row_array);

            }

        } else if (isset($_GET['medico_cf'])) {

            $medico_cf = $conn->real_escape_string($_GET['medico_cf']);

            $sql1 = $conn->query("SELECT consulto.id AS id_consulto, oggetto, data_inizio, paziente.nome AS paziente_nome, paziente.cognome AS paziente_cognome, 
            paziente.codice_fiscale AS paziente_cf, paziente.gender AS paziente_gender, paziente.data_nascita AS paziente_dataNascita 
            FROM consulto, partecipanti, paziente, medico WHERE consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente
            AND medico.id = partecipanti.id_medico AND medico.codice_fiscale = '$medico_cf' GROUP BY consulto.id ORDER BY paziente.cognome, paziente.nome");

            $num_results = mysqli_num_rows($sql1);

            $data = array('risultati' => $num_results);

            while ($d1 = $sql1->fetch_assoc()) {
                $row_array = array();
                $row_array['id_consulto'] = $d1['id_consulto'];     
                $row_array['oggetto'] = $d1['oggetto'];     
                $row_array['data_inizio'] = $d1['data_inizio'];
                $row_array['paziente_nome'] = $d1['paziente_nome'];
                $row_array['paziente_cognome'] = $d1['paziente_cognome'];
                $row_array['paziente_cf'] = $d1['paziente_cf'];    
                $row_array['paziente_nascita'] = $d1['paziente_dataNascita'];           
                $row_array['paziente_gender'] = $d1['paziente_gender'];      
                $row_array['medici'] = array();      

                $consulto_id = $d1['id_consulto'];  

                $sql2 = $conn->query("SELECT medico.email AS medico_email, medico.cognome AS medico_cognome, medico.nome AS medico_nome, 
                medico.codice_fiscale AS medico_cf, medico.professione AS medico_professione, richiedente FROM consulto, partecipanti, paziente, medico 
                WHERE consulto.id = '$consulto_id' AND consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico");

                while ($d2 = $sql2->fetch_assoc()) {
                    $row_array['medici'][] = array(
                        'medico_nome' => $d2['medico_nome'],
                        'medico_cognome' => $d2['medico_cognome'],
                        'medico_cf' => $d2['medico_cf'],
                        'medico_professione' => $d2['medico_professione'],
                        'medico_email' => $d2['medico_email'],
                        'richiedente' => $d2['richiedente']
                    );
                }

                array_push($data, $row_array); 

            }

        } else if (isset($_GET['data_inizio'])) {

            $data_inizio = $conn->real_escape_string($_GET['data_inizio']);

            $sql1 = $conn->query("SELECT consulto.id AS id_consulto, oggetto, data_inizio, paziente.nome AS paziente_nome, paziente.cognome AS paziente_cognome, 
            paziente.codice_fiscale AS paziente_cf, paziente.gender AS paziente_gender, paziente.data_nascita AS paziente_dataNascita 
            FROM consulto, partecipanti, paziente, medico WHERE data_inizio >= '$data_inizio' AND consulto.id = partecipanti.id_consulto 
            AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico GROUP BY consulto.id ORDER BY paziente.cognome, paziente.nome");

            $num_results = mysqli_num_rows($sql1);

            $data = array('risultati' => $num_results);

            while ($d1 = $sql1->fetch_assoc()) {
                $row_array = array();
                $row_array['id_consulto'] = $d1['id_consulto'];     
                $row_array['oggetto'] = $d1['oggetto'];     
                $row_array['data_inizio'] = $d1['data_inizio'];
                $row_array['paziente_nome'] = $d1['paziente_nome'];
                $row_array['paziente_cognome'] = $d1['paziente_cognome'];
                $row_array['paziente_cf'] = $d1['paziente_cf'];    
                $row_array['paziente_nascita'] = $d1['paziente_dataNascita'];           
                $row_array['paziente_gender'] = $d1['paziente_gender'];      
                $row_array['medici'] = array();      

                $consulto_id = $d1['id_consulto'];  

                $sql2 = $conn->query("SELECT medico.email AS medico_email, medico.cognome AS medico_cognome, medico.nome AS medico_nome, 
                medico.codice_fiscale AS medico_cf, medico.professione AS medico_professione, richiedente FROM consulto, partecipanti, paziente, medico 
                WHERE consulto.id = '$consulto_id' AND consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico");

                while ($d2 = $sql2->fetch_assoc()) {
                    $row_array['medici'][] = array(
                        'medico_nome' => $d2['medico_nome'],
                        'medico_cognome' => $d2['medico_cognome'],
                        'medico_cf' => $d2['medico_cf'],
                        'medico_professione' => $d2['medico_professione'],
                        'medico_email' => $d2['medico_email'],
                        'richiedente' => $d2['richiedente']
                    );
                }

                array_push($data, $row_array);
            }
        
          }  else {
            
            $sql1 = $conn->query("SELECT consulto.id AS id_consulto, oggetto, data_inizio, paziente.nome AS paziente_nome, paziente.cognome AS paziente_cognome, 
            paziente.codice_fiscale AS paziente_cf, paziente.gender AS paziente_gender, paziente.data_nascita AS paziente_dataNascita 
            FROM consulto, partecipanti, paziente, medico WHERE consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente 
            AND medico.id = partecipanti.id_medico GROUP BY consulto.id ORDER BY paziente.cognome, paziente.nome");

            $num_results = mysqli_num_rows($sql1);

            $data = array('risultati' => $num_results);

            while ($d1 = $sql1->fetch_assoc()) {
                $row_array = array();
                $row_array['id_consulto'] = $d1['id_consulto'];     
                $row_array['oggetto'] = $d1['oggetto'];     
                $row_array['data_inizio'] = $d1['data_inizio'];
                $row_array['paziente_nome'] = $d1['paziente_nome'];
                $row_array['paziente_cognome'] = $d1['paziente_cognome'];
                $row_array['paziente_cf'] = $d1['paziente_cf'];    
                $row_array['paziente_nascita'] = $d1['paziente_dataNascita'];           
                $row_array['paziente_gender'] = $d1['paziente_gender'];      
                $row_array['medici'] = array();      

                $consulto_id = $d1['id_consulto'];  

                $sql2 = $conn->query("SELECT medico.email AS medico_email, medico.cognome AS medico_cognome, medico.nome AS medico_nome, 
                medico.codice_fiscale AS medico_cf, medico.professione AS medico_professione, richiedente FROM consulto, partecipanti, paziente, medico 
                WHERE consulto.id = '$consulto_id' AND consulto.id = partecipanti.id_consulto AND paziente.id = consulto.paziente AND medico.id = partecipanti.id_medico");

                while ($d2 = $sql2->fetch_assoc()) {
                    $row_array['medici'][] = array(
                        'medico_nome' => $d2['medico_nome'],
                        'medico_cognome' => $d2['medico_cognome'],
                        'medico_cf' => $d2['medico_cf'],
                        'medico_professione' => $d2['medico_professione'],
                        'medico_email' => $d2['medico_email'],
                        'richiedente' => $d2['richiedente']
                    );
                }

                array_push($data, $row_array);

            }
        }

        if($data) {
            exit(json_encode($data));

        } else echo "Nessun risultato disponibile";


    } else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        if (!isset($_GET['id']))
            exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs in the URL')));

        $id = $conn->real_escape_string($_GET['id']);
        $data = urldecode(file_get_contents('php://input'));

        if (strpos($data, '=') !== false) {
            $allPairs = array();
            $data = explode('&', $data);
            foreach($data as $pair) {
                $pair = explode('=', $pair);
                $allPairs[$pair[0]] = $pair[1];
            }

            if (isset($allPairs['oggetto'])) {
                $conn->query("UPDATE consulto SET oggetto='".$allPairs['oggetto']."' WHERE id='$id'");
            } else
                exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs in the Body')));

            exit(json_encode(array("status" => 'success')));
        } else
            exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs')));

    } 
    
?>