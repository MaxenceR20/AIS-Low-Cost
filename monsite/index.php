<!-- CONNEXION A LA BDD -->
<?php
try
  {
$bdd = new PDO('mysql:host=localhost;dbname=pecheurs;charset=utf8', 'root', '');

} 
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
} 

$reponse = $bdd->query('SELECT * FROM balise');

?>
<!-- FIN CONNEXION A LA BDD -->

<!-- TITRE ET "LIBRAIRIE" -->
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="./css/anim.css">
<link rel="stylesheet" type="text/css" href="./css/bootstrap.css">

<meta charset="utf-8" />

<title>AIS Low Cost</title>

</head>

<!-- FIN TITRE ET "LIBRAIRIE" -->

<body>


<div style="background-image: url('img/Capture.png  ');"> 
<div class="container">
  <div class="row">
    <div class="col-sm" style="border : thin solid">
  <h5>Entrer le nouvel utilisateur<h5>



<!-- FORMULAIRE -->

  <form action="balise_bdd.php" method="GET">
    MMSI : <input type="text" name="MMSI"><br/>
    Nom : <input type="text" name="Nom"><br/>
    <input type="hidden" name="action" value="add">
    <input type="submit" name="">
  </form> 
   <?php 
    if(isset($_GET['add'])) 
        if($_GET['add']=='success') 
            echo '<p style="color: green">enregistrement effectué avec succès</p>';
        elseif ($_GET['add']=='fail')
            echo '<p style="color: red">enregistrement échoué</br>Verifier que :</br>-MMSI soit bien un Nombre</br>-Nom soit bien une chaine de caractére</br>-Que soit le nom , soit le MMSI ne soit pas déja utilisé</br>-Que aucun des champs ne soient vide</p>';
                     # code...
     ?>

<!-- FIN FORMULAIRE -->

<!-- RECUP ET TRIE DES INFO -->
      
            <?php
            while ($donnees = $reponse->fetch())
            {
                echo "Voici les données"."</br>";
                echo "MMSI : ".$donnees['MMSI']."<br/>";
                echo "Nom : ".$donnees['Nom']."<br/>";
                $MMSI = $donnees['MMSI'];
                echo $MMSI;
                echo "  <form action='balise_bdd.php'>
                        <input type='hidden' name='MMSI' value='$MMSI'>
                        <input type='submit' name='action' value='del'>
                      </form>";       
            }
                echo"<br/><br/>
                <form action='balise_bdd.php'>
                <input type='submit' name='action' value='delall'>
                </form>"
            ?> 
            
            
  

</div>
<!-- FIN RECUP ET TRIE DES INFO -->

<!-- BOUTON REDIRIGER VERS MAP -->
<div class="col-6" >
    <center>
        <h1>Marins Sans Frontières</h1> 
            <a href="http://localhost:8080/map.html" onclick="javascript:event.target.port=8080" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Commencer la surveillance</a> 
            <form action="balise_bdd.php">            
                   
            </form>
    </center>
</div>

</body>
</html>
<?php
$reponse->closeCursor();
?>