<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Main extends CI_Controller {
 
function __construct()
{
        parent::__construct();
        $this->load->model('inscripcion_model');
 
/* Standard Libraries of codeigniter are required */
$this->load->database();
$this->load->helper('url');
/* ------------------ */ 
 
$this->load->library('grocery_CRUD');
 
}
 
public function index()
{
	$this->load->view('restituidas_template');
}	


public function insertarInscripcion()
{

	$data = array(
        'nombres' => $this->input->post('nombres'),
        'apellidos' => $this->input->post('apellidos'),
        'telefono' => $this->input->post('telefono'),
        'email' => $this->input->post('email'),
        'pais' => $this->input->post('pais'),
        'ciudad' => $this->input->post('ciudad'),
        'iglesia' => $this->input->post('iglesia'),
        'pastor' => $this->input->post('pastor')
    );

	 $this->inscripcion_model->form_insert($data);
}


function _example_output($output = null){
	$this->load->view('template.php',$output);    
}
 
public function inscripcion()
{
$this->grocery_crud->set_table('inscripcion');
$output = $this->grocery_crud->render();
 
$this->_example_output($output); 
}
}