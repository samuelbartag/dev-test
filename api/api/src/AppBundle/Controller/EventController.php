<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;

use Doctrine\DataTables;

use AppBundle\Entity\Event;

/**
 * @Route("/api")
 */
class EventController extends FOSRestController
{

    /**
     * Lists all event entities.
     *
     * @Rest\Get("/event")
     */
    public function getEventsAction(Request $request)
    {
        $events = $this->getDoctrine()->getRepository('AppBundle:Event')->findAll();

        return $events;
    }

    /**
     * Creates a new event entity.
     *
     * @Rest\Get("/event/{id}")
     */
    public function getEventAction($id)
    {
        $event = $this->getDoctrine()->getRepository('AppBundle:Event')->find($id);

        if (!$event) {
          return new View(null, Response::HTTP_NOT_FOUND);
        }

        return $event;
    }

    /**
     * @Rest\Post("/event")
     */
    public function postEventAction(Request $request)
    {
        $data = json_decode($request->getContent());

        $name         = $data->event;
        $place        = $data->place;
        $date         = $data->date;
        $time         = $data->time;
        $participants = $data->participants;

        $event = new Event;
        $event->setEvent($name);
        $event->setPlace($place);
        $event->setDate(date_create($date));
        $event->setTime(date_create_from_format("Y-m-d H:i", $date." ".$time));
        $event->setParticipants($participants);

        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();
        return $event;
    }

    /**
     * @Rest\Put("/event/{id}")
     */
    public function putEventAction($id, Request $request)
    {
        $data = json_decode($request->getContent());

        $name         = $data->event;
        $place        = $data->place;
        $date         = $data->date;
        $time         = $data->time;
        $participants = $data->participants;

        $event = $this->getDoctrine()->getRepository('AppBundle:Event')->find($id);

        if (!$event) {
          return new View(null, Response::HTTP_NOT_FOUND);
        }

        $event->setEvent($name);
        $event->setPlace($place);
        $event->setDate(date_create($date));
        $event->setTime(date_create_from_format("Y-m-d H:i", $date." ".$time));
        $event->setParticipants($participants);

        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();

        return $event;
    }

    /**
     * @Rest\Delete("/event/{id}")
     */
    public function deleteEventAction($id)
    {
        $event = $this->getDoctrine()->getRepository('AppBundle:Event')->find($id);

        if (!$event) {
          return new View(null, Response::HTTP_NOT_FOUND);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($event);
        $em->flush();

        return new View(null, Response::HTTP_NO_CONTENT);
    }

}
