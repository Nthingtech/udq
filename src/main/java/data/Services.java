package data;

import io.quarkiverse.roq.data.runtime.annotations.DataMapping;

import java.util.List;

@DataMapping(value = "services", type = DataMapping.Type.ARRAY_FILE)
public record Services(List<Service> list) {

    public record Service(String icon, String title, String text) {}
}
