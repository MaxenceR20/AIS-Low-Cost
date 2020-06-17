<?php
try
{
$bdd = new PDO('mysql:host=localhost;dbname=pecheurs;charset=utf8', 'root', '');
} 
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
} 

if($_REQUEST["action"]=="add")addBalise($bdd);
if($_REQUEST["action"]=="del")deleteLine($bdd);
if($_REQUEST["action"]=="getall")getAllBalises($bdd);
if($_REQUEST["action"]=="newbutton")newMember($bdd);
if($_REQUEST["action"]=="delall")deleteAll($bdd);
if($_REQUEST["action"]=="addPos")deleteAll($bdd);



function addPos()
{
	echo "addPos";
}
function addBalise($bdd)
{

	$MMSI = $_GET["MMSI"];
	$nom = $_GET["Nom"];

    	//echo $donnees['MMSI'];
		//$nompecheurs = $donnees['Nom'];
		
    //$bdd->exec('INSERT INTO balise (MMSI,Nom) VALUES ($donnees['MMSI'], $donnees['MMSI'])');

	$req = $bdd->prepare('INSERT INTO balise(MMSI,Nom) VALUES(:mmsi, :nom)');
	
	
	if ($req->execute(array('mmsi' => $MMSI,'nom' => $nom)))
	{
  	//succes
	header('location:index.php?add=success');
	}
	else
	{
  	//failure
	header('location:index.php?add=fail');
	}
	
	//if(ok)
		//header('location:testphp.php?add=success');
	//else(ok)
		//header('location:testphp.php?add=fail');
}
function deleteLine($bdd)
{
    //$bdd->exec('TRUNCATE TABLE `balise`');
    echo "Voici les données"."</br>";
    //$MMSI = addBalise($bdd);
    $MMSI=$_GET["MMSI"];
    $req = $bdd->prepare('DELETE FROM `balise` WHERE `MMSI`=:mmsi');
    $req->execute(array('mmsi' => $MMSI));
    header('location:index.php');
   // $bdd->exec('DELETE FROM `balise` WHERE `MMSI`=$MMSI');     
	//header("location:index.php");


}
function deleteAll($bdd)
{
	$bdd->exec('TRUNCATE TABLE `balise`');
	header('location:index.php');
}







/*function newMember($bdd)
{ 
	echo "Oui bien vu";
}*/
/*function getAllBalises($bdd)
{	
	$reponse = $bdd->query('SELECT * FROM balise');

	while ($donnees = $reponse->fetch())
    {
	$reponse = $bdd->query('SELECT * FROM balise');
	$donnees = $reponse->fetch();
	echo "MMSI : ".$donnees['MMSI']."<br/>";
    echo "Nom : ".$donnees['Nom']."<br/>";
    }
}
*/



















?>
