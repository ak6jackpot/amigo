/* <>
            <Typography text={itineraryStore?.itineraries[0].name} />
            <Typography text={itineraryStore?.itineraries[0].description} />
            {itineraryStore?.itineraries[0].locations.map(location => (
              <>
                <Typography text={location.name} />
                <Typography text={location.description} />
                <ButtonComp
                  onPress={() =>
                    itineraryStore?.toggleLocationVisited(
                      itineraryStore?.itineraries[0].id,
                      location.id,
                    )
                  }
                  text={location.visited ? 'Visited' : 'Mark as Visited'}
                />
              </>
            ))}
            <ButtonComp
              onPress={() => itineraryStore?.removeItinerary(itinerary.id)}
              text="Remove Itinerary"
            />
          </> */
